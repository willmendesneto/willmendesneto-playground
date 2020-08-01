import uuidV4 from 'uuid/v4';
import { MediaStore, UploadController, getMediaTypeFromMimeType, isMimeTypeSupportedByBrowser, getFileStreamsCache, MediaClient, globalMediaEventEmitter, } from '@atlaskit/media-client';
import { RECENTS_COLLECTION } from '@atlaskit/media-client/constants';
import { EventEmitter2 } from 'eventemitter2';
import { mapAuthToSourceFileOwner } from '../popup/domain/source-file';
import { getPreviewFromImage } from '../util/getPreviewFromImage';
import { LocalFileSource } from '../service/types';
import { getPreviewFromBlob } from '../util/getPreviewFromBlob';
export class UploadServiceImpl {
    constructor(tenantMediaClient, tenantUploadParams, shouldCopyFileToRecents) {
        this.tenantMediaClient = tenantMediaClient;
        this.tenantUploadParams = tenantUploadParams;
        this.shouldCopyFileToRecents = shouldCopyFileToRecents;
        this.emit = (event, payload) => {
            this.emitter.emit(event, payload);
        };
        this.onFileSuccess = async (cancellableFileUpload, fileId) => {
            const { mediaFile } = cancellableFileUpload;
            this.copyFileToUsersCollection(fileId)
                // eslint-disable-next-line no-console
                .catch(console.log); // We intentionally swallow these errors
            this.emit('file-converting', {
                file: mediaFile,
            });
            cancellableFileUpload.cancel = () => {
                this.releaseCancellableFile(mediaFile);
            };
        };
        this.onFileError = (mediaFile, mediaErrorName, error) => {
            this.releaseCancellableFile(mediaFile);
            if (error === 'canceled') {
                // Specific error coming from chunkinator via rejected fileId promise.
                // We do not want to trigger error in this case.
                return;
            }
            const description = error instanceof Error ? error.message : error;
            this.emit('file-upload-error', {
                fileId: mediaFile.id,
                error: {
                    fileId: mediaFile.id,
                    description: description,
                    name: mediaErrorName,
                },
            });
        };
        this.emitter = new EventEmitter2();
        this.cancellableFilesUploads = {};
        const { userAuthProvider } = tenantMediaClient.config;
        if (userAuthProvider) {
            this.userMediaStore = new MediaStore({
                authProvider: userAuthProvider,
            });
            // We need to use the userAuth to upload this file (recents)
            this.userMediaClient = new MediaClient({
                userAuthProvider,
                authProvider: userAuthProvider,
            });
        }
    }
    setUploadParams(uploadParams) {
        this.tenantUploadParams = uploadParams;
    }
    // Used for testing
    createUploadController() {
        return new UploadController();
    }
    addFiles(files) {
        this.addFilesWithSource(files.map((file) => ({
            file,
            source: LocalFileSource.LocalUpload,
        })));
    }
    addFilesWithSource(files) {
        if (files.length === 0) {
            return;
        }
        const creationDate = Date.now();
        const { userMediaClient, tenantMediaClient, shouldCopyFileToRecents, } = this;
        const mediaClient = shouldCopyFileToRecents
            ? tenantMediaClient
            : userMediaClient;
        const collection = shouldCopyFileToRecents
            ? this.tenantUploadParams.collection
            : RECENTS_COLLECTION;
        if (!mediaClient) {
            return;
        }
        const touchFileDescriptors = [];
        for (let i = 0; i < files.length; i++) {
            touchFileDescriptors.push({
                fileId: uuidV4(),
                occurrenceKey: uuidV4(),
                collection,
            });
        }
        const promisedTouchFiles = mediaClient.file.touchFiles(touchFileDescriptors, collection);
        const cancellableFileUploads = files.map((fileWithSource, i) => {
            const { file, source } = fileWithSource;
            const { fileId: id, occurrenceKey } = touchFileDescriptors[i];
            const deferredUploadId = promisedTouchFiles.then(touchedFiles => {
                const touchedFile = touchedFiles.created.find(touchedFile => touchedFile.fileId === id);
                if (!touchedFile) {
                    // TODO No one seems to be caring about this error
                    throw new Error('Cant retrieve uploadId from result of touch endpoint call');
                }
                return touchedFile.uploadId;
            });
            const uploadableFile = {
                collection,
                content: file,
                name: file.name,
                mimeType: file.type,
            };
            const uploadableUpfrontIds = {
                id,
                occurrenceKey,
                deferredUploadId,
            };
            const controller = this.createUploadController();
            const sourceFileObservable = mediaClient.file.upload(uploadableFile, controller, uploadableUpfrontIds);
            const mediaFile = {
                id,
                name: file.name,
                size: file.size,
                creationDate,
                type: file.type,
                occurrenceKey,
            };
            const cancellableFileUpload = {
                mediaFile,
                file,
                source,
                cancel: () => {
                    // we can't do "cancellableFileUpload.cancel = controller.abort" because will change the "this" mediaClient
                    controller.abort();
                },
            };
            const onFileSuccess = this.onFileSuccess.bind(this);
            sourceFileObservable.subscribe({
                next(state) {
                    if (state.status === 'processing') {
                        this.unsubscribe();
                        if (shouldCopyFileToRecents) {
                            mediaClient.emit('file-added', state);
                            globalMediaEventEmitter.emit('file-added', state);
                        }
                        onFileSuccess(cancellableFileUpload, id);
                    }
                },
                error: error => {
                    this.onFileError(mediaFile, 'upload_fail', error);
                },
            });
            this.cancellableFilesUploads[id] = cancellableFileUpload;
            // Save observable in the cache
            getFileStreamsCache().set(id, sourceFileObservable);
            return cancellableFileUpload;
        });
        const mediaFiles = cancellableFileUploads.map(cancellableFileUpload => cancellableFileUpload.mediaFile);
        this.emit('files-added', { files: mediaFiles });
        this.emitPreviews(cancellableFileUploads);
    }
    cancel(id) {
        if (id) {
            const cancellableFileUpload = this.cancellableFilesUploads[id];
            if (cancellableFileUpload && cancellableFileUpload.cancel) {
                cancellableFileUpload.cancel();
            }
        }
        else {
            Object.keys(this.cancellableFilesUploads).forEach(key => {
                const cancellableFileUpload = this.cancellableFilesUploads[key];
                if (cancellableFileUpload.cancel) {
                    cancellableFileUpload.cancel();
                }
            });
        }
    }
    on(event, listener) {
        this.emitter.on(event, listener);
    }
    off(event, listener) {
        this.emitter.off(event, listener);
    }
    emitPreviews(cancellableFileUploads) {
        cancellableFileUploads.forEach(cancellableFileUpload => {
            const { file, mediaFile, source } = cancellableFileUpload;
            const { type } = file;
            const mediaType = this.getMediaTypeFromFile(file);
            if (!isMimeTypeSupportedByBrowser(type)) {
                this.emit('file-preview-update', {
                    file: mediaFile,
                    preview: {},
                });
                return;
            }
            if (mediaType === 'image') {
                getPreviewFromImage(file, source === LocalFileSource.PastedScreenshot
                    ? window.devicePixelRatio
                    : undefined).then(preview => {
                    this.emit('file-preview-update', {
                        file: mediaFile,
                        preview,
                    });
                });
            }
            else {
                getPreviewFromBlob(file, mediaType).then(preview => {
                    this.emit('file-preview-update', {
                        file: mediaFile,
                        preview,
                    });
                });
            }
        });
    }
    getMediaTypeFromFile(file) {
        const { type } = file;
        return getMediaTypeFromMimeType(type);
    }
    releaseCancellableFile(mediaFile) {
        delete this.cancellableFilesUploads[mediaFile.id];
    }
    // This method copies the file from the "tenant collection" to the "user collection" (recents).
    // that means we need "tenant auth" as input and "user auth" as output
    copyFileToUsersCollection(sourceFileId) {
        const { shouldCopyFileToRecents, userMediaStore, tenantUploadParams, } = this;
        if (!shouldCopyFileToRecents || !userMediaStore) {
            return Promise.resolve();
        }
        const { collection: sourceCollection } = tenantUploadParams;
        const { authProvider: tenantAuthProvider } = this.tenantMediaClient.config;
        return tenantAuthProvider({ collectionName: sourceCollection }).then(auth => {
            const body = {
                sourceFile: {
                    id: sourceFileId,
                    collection: sourceCollection,
                    owner: {
                        ...mapAuthToSourceFileOwner(auth),
                    },
                },
            };
            const params = {
                collection: RECENTS_COLLECTION,
            };
            return userMediaStore.copyFileWithToken(body, params);
        });
    }
}
//# sourceMappingURL=uploadServiceImpl.js.map