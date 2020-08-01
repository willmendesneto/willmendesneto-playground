import { __assign } from "tslib";
import { RECENTS_COLLECTION } from '@atlaskit/media-client/constants';
import { finalizeUpload } from '../actions/finalizeUpload';
import { HANDLE_CLOUD_FETCHING_EVENT, } from '../actions/handleCloudFetchingEvent';
import { sendUploadEvent } from '../actions/sendUploadEvent';
var isCloudFetchingEventAction = function (action) {
    return action.type === HANDLE_CLOUD_FETCHING_EVENT;
};
var isRemoteUploadProgressAction = function (action) {
    return action.event === 'RemoteUploadProgress';
};
var isRemoteUploadEndAction = function (action) {
    return action.event === 'RemoteUploadEnd';
};
var isRemoteUploadFailAction = function (action) {
    return action.event === 'RemoteUploadFail';
};
export var handleCloudFetchingEvent = function (store) { return function (next) { return function (action) {
    // Handle cloud upload progress
    var handleRemoteUploadProgressMessage = function (file, data) {
        // TODO: MS2927 - handle progress for remote uploads
    };
    // Handle cloud upload end
    var handleRemoteUploadEndMessage = function (file, payload) {
        var tenantFileId = payload.tenantFileId, userFileId = payload.userFileId;
        var source = {
            id: userFileId,
            collection: RECENTS_COLLECTION,
        };
        var uploadedFile = __assign(__assign({}, file), { id: userFileId });
        store.dispatch(finalizeUpload(uploadedFile, tenantFileId, source));
    };
    // Handle cloud upload fail
    var handleRemoteUploadFailMessage = function (file, data) {
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
}; }; };
//# sourceMappingURL=handleCloudFetchingEvent.js.map