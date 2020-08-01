import uuid from 'uuid/v4';
import { getFileStreamsCache, createFileStateSubject, getMediaTypeFromMimeType, isImageRepresentationReady, isPreviewableType, isPreviewableFileState, observableToPromise, isErrorFileState, isProcessedFileState, isFinalFileState, isMimeTypeSupportedByBrowser, } from '@atlaskit/media-client';
import { RECENTS_COLLECTION } from '@atlaskit/media-client/constants';
import { isStartImportAction } from '../actions/startImport';
import { finalizeUpload } from '../actions/finalizeUpload';
import { remoteUploadStart } from '../actions/remoteUploadStart';
import { getPreview } from '../actions/getPreview';
import { handleCloudFetchingEvent } from '../actions/handleCloudFetchingEvent';
import { hidePopup } from '../actions/hidePopup';
import { resetView } from '../actions/resetView';
import { RemoteUploadActivity } from '../tools/websocket/upload/remoteUploadActivity';
import { copyMediaFileForUpload } from '../../domain/file';
import { sendUploadEvent } from '../actions/sendUploadEvent';
import { getPreviewFromMetadata } from '../../domain/preview';
import { getPreviewFromBlob } from '../../util/getPreviewFromBlob';
export const isRemoteFileItem = (item) => {
    return ['dropbox', 'google', 'giphy'].indexOf(item.serviceName) !== -1;
};
export const isRemoteService = (serviceName) => {
    return ['dropbox', 'google', 'giphy'].indexOf(serviceName) !== -1;
};
const mapSelectedItemToSelectedUploadFile = ({ id, name, mimeType, size, date, serviceName, accountId, occurrenceKey = uuid(), }, tenantFileId, collection) => ({
    file: {
        id,
        name,
        size,
        creationDate: date || Date.now(),
        type: mimeType,
        occurrenceKey,
    },
    serviceName,
    accountId,
    touchFileDescriptor: {
        fileId: tenantFileId,
        occurrenceKey,
        collection,
    },
});
export function importFilesMiddleware(eventEmitter, wsProvider) {
    return store => (next) => (action) => {
        if (isStartImportAction(action)) {
            importFiles(eventEmitter, store, wsProvider);
        }
        return next(action);
    };
}
const getRemotePreview = async (store, fileId) => {
    const { userMediaClient } = store.getState();
    const blob = await userMediaClient.getImage(fileId, {
        collection: RECENTS_COLLECTION,
        mode: 'fit',
    }, undefined, true);
    return { value: blob, origin: 'remote' };
};
const getPreviewByService = (store, serviceName, mediaType, fileId) => {
    if (serviceName === 'giphy') {
        const { giphy } = store.getState();
        const selectedGiphy = giphy.imageCardModels.find(cardModel => cardModel.metadata.id === fileId);
        if (selectedGiphy) {
            return Promise.resolve({
                value: selectedGiphy.dataURI,
                origin: 'remote',
            });
        }
    }
    else if (serviceName === 'upload') {
        const observable = getFileStreamsCache().get(fileId);
        if (observable) {
            return new Promise((resolve, reject) => observable.subscribe({
                next(state) {
                    if (isPreviewableFileState(state)) {
                        // We only want to resolve defined state.preview, even though
                        // TS allows resolve with undefined.
                        this.unsubscribe();
                        return resolve(state.preview);
                    }
                    if (isFinalFileState(state)) {
                        this.unsubscribe();
                        return isImageRepresentationReady(state)
                            ? resolve(getRemotePreview(store, fileId))
                            : reject(new Error('File has no image representation'));
                    }
                },
            }));
        }
    }
    else if (serviceName === 'recent_files' && isPreviewableType(mediaType)) {
        // TODO, EDM-674: handle case where recent file is an image/video and has failed processing
        return getRemotePreview(store, fileId);
    }
    return undefined;
};
/**
 * Take selected file (that can be local uploads, recents or remote file (giphy, google, dropbox))
 * and convert it to FileState that will become tenant file state.
 * If selected file already in the cache (for local uploads and recents) we take everything it has, change it's id
 * to new tenant id (generated on client side) and add a preview.
 * If selected file is not in the cache (for remote selected files) we generate new file state
 * with details found in selected file.
 */
export const getTenantFileState = async (store, selectedUploadFile) => {
    const { file: selectedUserFile, serviceName, touchFileDescriptor, } = selectedUploadFile;
    const { fileId: tenantFileId, occurrenceKey: tenantOccurrenceKey, } = touchFileDescriptor;
    const selectedUserFileId = selectedUserFile.id;
    const mediaType = getMediaTypeFromMimeType(selectedUserFile.type);
    const preview = getPreviewByService(store, serviceName, mediaType, selectedUserFileId);
    const userFileObservable = getFileStreamsCache().get(selectedUserFileId);
    if (userFileObservable) {
        // Even though there is await here we will wait mostly for 1 tick, since
        // observable.next inside observableToPromise will eval synchronously.
        const userFileState = await observableToPromise(userFileObservable);
        if (isErrorFileState(userFileState)) {
            return {
                ...userFileState,
                id: tenantFileId,
            };
        }
        if (!isProcessedFileState(userFileState)) {
            // we don't create the tenant FileState from a "processed" user fileState
            // to not inherit the user artfifacts that we couldn't access later on
            return {
                ...userFileState,
                id: tenantFileId,
                mediaType,
                preview,
            };
        }
    }
    return {
        id: tenantFileId,
        occurrenceKey: tenantOccurrenceKey,
        status: 'processing',
        mediaType,
        mimeType: selectedUserFile.type,
        name: selectedUserFile.name,
        size: selectedUserFile.size,
        preview,
        representations: {},
    };
};
/**
 * Add tenant state to the cache and then emit this state to everyone who is listening on
 * 1. mediaClient even-emitter interface (mediaClient.on()).
 *  Note: There shouldn't be anyone listening here atm. This will be removed as soon as we remove Context API.
 * 2. globalMediaEventEmitter even-emitter interface.
 *  Note: This is different from `mediaPicker.on()` event-emitter interface!
 */
const distributeTenantFileState = async (tenantFileState, userSelectedFileId) => {
    const tenantFileSubject = createFileStateSubject();
    const userFileObservable = getFileStreamsCache().get(userSelectedFileId);
    getFileStreamsCache().set(tenantFileState.id, tenantFileSubject);
    tenantFileSubject.next(tenantFileState);
    if (userFileObservable) {
        userFileObservable.subscribe({
            next: latestUserFileState => {
                // let's not inherit a "processed" user fileState
                // to not inherit the user artfifacts that we couldn't access later on
                if (isProcessedFileState(latestUserFileState)) {
                    return;
                }
                const overrides = !isErrorFileState(tenantFileState)
                    ? {
                        mediaType: tenantFileState.mediaType,
                        preview: tenantFileState.preview,
                    }
                    : {};
                tenantFileSubject.next({
                    ...latestUserFileState,
                    ...overrides,
                    id: tenantFileState.id,
                });
            },
        });
    }
};
/**
 * We call `/upload/createWithFiles` (touch) endpoint to create an empty file with client side
 * generated file ID that we use here as tenant file id.
 */
export const touchSelectedFile = (touchFileDescriptor, store) => {
    const { tenantMediaClient, config } = store.getState();
    const tenantCollection = config.uploadParams && config.uploadParams.collection;
    return tenantMediaClient.file.touchFiles([touchFileDescriptor], tenantCollection);
};
const isKnowServiceName = ({ serviceName }) => ['recent_files', 'google', 'dropbox', 'upload', 'giphy'].indexOf(serviceName) > -1;
export async function importFiles(eventEmitter, store, wsProvider) {
    const { uploads, selectedItems, userMediaClient, config } = store.getState();
    const tenantCollection = config.uploadParams && config.uploadParams.collection;
    store.dispatch(hidePopup());
    const selectedPluginItems = selectedItems.filter(item => !isKnowServiceName(item));
    const userAuth = await userMediaClient.config.authProvider();
    const selectedUploadFiles = selectedItems
        .filter(isKnowServiceName)
        .map(item => {
        const tenantFileId = uuid();
        return mapSelectedItemToSelectedUploadFile(item, tenantFileId, tenantCollection);
    });
    eventEmitter.emitPluginItemsInserted(selectedPluginItems);
    await Promise.all(selectedUploadFiles.map(async (selectedUploadFile) => {
        // 1. We convert selectedUploadItems into tenant's fileState
        const tenantFileState = await getTenantFileState(store, selectedUploadFile);
        const userSelectedFileId = selectedUploadFile.file.id;
        // 2. We store them to the cache and notify all listeners of global event emitter
        distributeTenantFileState(tenantFileState, userSelectedFileId);
    }));
    // 3. We notify all listeners of mediaPicker event emitter about 'uploads-start' event
    eventEmitter.emitUploadsStart(selectedUploadFiles.map(({ file, touchFileDescriptor }) => copyMediaFileForUpload(file, touchFileDescriptor.fileId)));
    // 4. Now, when empty file was created we can do all the necessary uploading/copy operations
    // TODO here we don't have actually guarantee that empty file was created.
    // https://product-fabric.atlassian.net/browse/MS-2165
    selectedUploadFiles.forEach(selectedUploadFile => {
        const { file, serviceName } = selectedUploadFile;
        const selectedItemId = file.id;
        if (serviceName === 'upload') {
            const localUpload = uploads[selectedItemId];
            importFilesFromLocalUpload(selectedUploadFile, store, localUpload);
        }
        else if (serviceName === 'recent_files') {
            importFilesFromRecentFiles(selectedUploadFile, store);
        }
        else if (isRemoteService(serviceName)) {
            const wsConnectionHolder = wsProvider.getWsConnectionHolder(userAuth);
            importFilesFromRemoteService(selectedUploadFile, store, wsConnectionHolder);
        }
    });
    store.dispatch(resetView());
}
const fileStateToMediaFile = (fileState) => {
    const { id, name, size, mimeType, occurrenceKey } = fileState;
    return {
        id,
        creationDate: -1,
        name,
        size,
        type: mimeType,
        occurrenceKey,
    };
};
const emitPublicEvents = (selectedUploadFile, store, localUpload) => {
    const { touchFileDescriptor: { fileId }, } = selectedUploadFile;
    const { tenantMediaClient } = store.getState();
    const publicEventEmissionState = {
        'upload-preview-update': 'unsent',
        'upload-error': 'unsent',
        'upload-end': 'unsent',
    };
    const pendingEvents = {
        'upload-end': undefined,
    };
    const dispatchUploadError = (fileState) => {
        const { id, message = '' } = fileState;
        const event = {
            name: 'upload-error',
            data: {
                error: {
                    fileId: id,
                    description: message,
                    name: 'upload_fail',
                },
                fileId: id,
            },
        };
        store.dispatch(sendUploadEvent({ event, fileId }));
    };
    const dispatchUploadPreviewUpdate = async (fileState, value) => {
        const { mediaType } = fileState;
        const file = fileStateToMediaFile(fileState);
        const preview = value instanceof Blob ? await getPreviewFromBlob(value, mediaType) : {};
        const event = {
            name: 'upload-preview-update',
            data: {
                file,
                preview,
            },
        };
        store.dispatch(sendUploadEvent({ event, fileId }));
    };
    const dispatchUploadEnd = (fileState) => {
        const file = fileStateToMediaFile(fileState);
        // File to copy from
        const source = {
            id: localUpload.file.metadata.id,
            collection: RECENTS_COLLECTION,
        };
        store.dispatch(finalizeUpload(file, fileId, source));
    };
    const canDispatchUploadPreview = () => publicEventEmissionState['upload-preview-update'] === 'unsent';
    const canDispatchUploadEnd = (fileState) => ['processing', 'processed', 'failed-processing'].includes(fileState.status) && publicEventEmissionState['upload-end'] === 'unsent';
    const canUnsubscribe = () => 
    // we can unsubscribe when all events are fired
    publicEventEmissionState['upload-preview-update'] !== 'unsent' &&
        publicEventEmissionState['upload-end'] !== 'unsent';
    const dispatchPendingEvents = () => {
        if (pendingEvents['upload-end'] &&
            publicEventEmissionState['upload-preview-update'] === 'sent') {
            pendingEvents['upload-end']();
            delete pendingEvents['upload-end'];
        }
    };
    tenantMediaClient.file.getFileState(fileId).subscribe({
        async next(fileState) {
            if (isErrorFileState(fileState)) {
                if (publicEventEmissionState['upload-error'] !== 'sent') {
                    dispatchUploadError(fileState);
                    publicEventEmissionState['upload-error'] = 'sent';
                }
                return;
            }
            const { preview, mimeType } = fileState;
            // MPT-131: for non-natively supported files, send 'upload-preview-update' event with empty payload
            // File will be rendered with default dimensions.
            if (canDispatchUploadPreview() &&
                !isMimeTypeSupportedByBrowser(mimeType)) {
                publicEventEmissionState['upload-preview-update'] = 'sending';
                await dispatchUploadPreviewUpdate(fileState);
                publicEventEmissionState['upload-preview-update'] = 'sent';
            }
            // MPT-131: for natively supported files, awaiting on local preview to send 'upload-preview-update' event
            // File will be rendered with extracted dimensions.
            if (preview) {
                let value;
                try {
                    value = (await preview).value;
                }
                catch (err) {
                    value = undefined;
                }
                if (canDispatchUploadPreview()) {
                    publicEventEmissionState['upload-preview-update'] = 'sending';
                    await dispatchUploadPreviewUpdate(fileState, value);
                    publicEventEmissionState['upload-preview-update'] = 'sent';
                }
            }
            if (canDispatchUploadEnd(fileState)) {
                pendingEvents['upload-end'] = () => {
                    dispatchUploadEnd(fileState);
                    publicEventEmissionState['upload-end'] = 'sent';
                };
            }
            dispatchPendingEvents();
            if (canUnsubscribe()) {
                this.unsubscribe();
            }
        },
    });
};
const importFilesFromLocalUpload = async (selectedUploadFile, store, localUpload) => {
    const { touchFileDescriptor } = selectedUploadFile;
    await touchSelectedFile(touchFileDescriptor, store);
    emitPublicEvents(selectedUploadFile, store, localUpload);
};
const importFilesFromRecentFiles = async (selectedUploadFile, store) => {
    const { file, touchFileDescriptor } = selectedUploadFile;
    const { fileId } = touchFileDescriptor;
    const source = {
        id: file.id,
        collection: RECENTS_COLLECTION,
    };
    // we want to dispatch preview to provide card size to editor before we wait for http calls
    store.dispatch(getPreview(fileId, file, RECENTS_COLLECTION));
    await touchSelectedFile(touchFileDescriptor, store);
    store.dispatch(finalizeUpload(file, fileId, source));
};
const importFilesFromRemoteService = async (selectedUploadFile, store, wsConnectionHolder) => {
    const { touchFileDescriptor, serviceName, accountId, file, } = selectedUploadFile;
    const { fileId: tenantFileId } = touchFileDescriptor;
    const uploadActivity = new RemoteUploadActivity(tenantFileId, serviceName, (event, payload) => {
        if (event === 'NotifyMetadata') {
            const preview = getPreviewFromMetadata(payload.metadata);
            store.dispatch(sendUploadEvent({
                event: {
                    name: 'upload-preview-update',
                    data: {
                        file,
                        preview,
                    },
                },
                fileId: tenantFileId,
            }));
        }
        else {
            const { tenantFileId } = payload;
            const newFile = {
                ...file,
                id: tenantFileId,
                creationDate: Date.now(),
            };
            store.dispatch(handleCloudFetchingEvent(newFile, event, payload));
        }
    });
    uploadActivity.on('Started', () => {
        store.dispatch(remoteUploadStart(tenantFileId));
    });
    wsConnectionHolder.openConnection(uploadActivity);
    wsConnectionHolder.send({
        type: 'fetchFile',
        params: {
            serviceName,
            accountId,
            // This fileId is identifier of a file in the cloud provider. For Dropbox for ex. it will be
            // a filename path
            fileId: file.id,
            fileName: file.name,
            collection: RECENTS_COLLECTION,
            // This seems to be a hack, where we hijack `jobId` to
            // push through associated tenant fileId to use it in the future as a replaceFileId.
            // Actual file will be created in parallel by next `touchSelectedFile()` call.
            // IMPORTANT! This ID will magically becomes `uploadId` in most of the consequent messages coming back from WS
            // (see RemoteUploadBasePayload.uploadId)
            jobId: tenantFileId,
        },
    });
    // that still may cause async issues if file is fetched before this has happened
    // but the chances of that are extremely slim as cloud fetching is a very lengthy procedure
    await touchSelectedFile(touchFileDescriptor, store);
};
//# sourceMappingURL=importFiles.js.map