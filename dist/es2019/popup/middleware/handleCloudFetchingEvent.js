import { RECENTS_COLLECTION } from '@atlaskit/media-client/constants';
import { finalizeUpload } from '../actions/finalizeUpload';
import { HANDLE_CLOUD_FETCHING_EVENT, } from '../actions/handleCloudFetchingEvent';
import { sendUploadEvent } from '../actions/sendUploadEvent';
const isCloudFetchingEventAction = (action) => {
    return action.type === HANDLE_CLOUD_FETCHING_EVENT;
};
const isRemoteUploadProgressAction = (action) => {
    return action.event === 'RemoteUploadProgress';
};
const isRemoteUploadEndAction = (action) => {
    return action.event === 'RemoteUploadEnd';
};
const isRemoteUploadFailAction = (action) => {
    return action.event === 'RemoteUploadFail';
};
export const handleCloudFetchingEvent = (store) => (next) => (action) => {
    // Handle cloud upload progress
    const handleRemoteUploadProgressMessage = (file, data) => {
        // TODO: MS2927 - handle progress for remote uploads
    };
    // Handle cloud upload end
    const handleRemoteUploadEndMessage = (file, payload) => {
        const { tenantFileId, userFileId } = payload;
        const source = {
            id: userFileId,
            collection: RECENTS_COLLECTION,
        };
        const uploadedFile = {
            ...file,
            id: userFileId,
        };
        store.dispatch(finalizeUpload(uploadedFile, tenantFileId, source));
    };
    // Handle cloud upload fail
    const handleRemoteUploadFailMessage = (file, data) => {
        store.dispatch(sendUploadEvent({
            event: {
                name: 'upload-error',
                data: {
                    fileId: data.tenantFileId,
                    error: {
                        fileId: data.tenantFileId,
                        name: 'remote_upload_fail',
                        description: data.description,
                    },
                },
            },
            fileId: data.tenantFileId,
        }));
    };
    if (isCloudFetchingEventAction(action)) {
        if (isRemoteUploadProgressAction(action)) {
            handleRemoteUploadProgressMessage(action.file, action.payload);
        }
        else if (isRemoteUploadEndAction(action)) {
            handleRemoteUploadEndMessage(action.file, action.payload);
        }
        else if (isRemoteUploadFailAction(action)) {
            handleRemoteUploadFailMessage(action.file, action.payload);
        }
    }
    return next(action);
};
//# sourceMappingURL=handleCloudFetchingEvent.js.map