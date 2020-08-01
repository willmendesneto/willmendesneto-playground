"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constants_1 = require("@atlaskit/media-client/constants");
var finalizeUpload_1 = require("../actions/finalizeUpload");
var handleCloudFetchingEvent_1 = require("../actions/handleCloudFetchingEvent");
var sendUploadEvent_1 = require("../actions/sendUploadEvent");
var isCloudFetchingEventAction = function (action) {
    return action.type === handleCloudFetchingEvent_1.HANDLE_CLOUD_FETCHING_EVENT;
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
exports.handleCloudFetchingEvent = function (store) { return function (next) { return function (action) {
    // Handle cloud upload progress
    var handleRemoteUploadProgressMessage = function (file, data) {
        // TODO: MS2927 - handle progress for remote uploads
    };
    // Handle cloud upload end
    var handleRemoteUploadEndMessage = function (file, payload) {
        var tenantFileId = payload.tenantFileId, userFileId = payload.userFileId;
        var source = {
            id: userFileId,
            collection: constants_1.RECENTS_COLLECTION,
        };
        var uploadedFile = tslib_1.__assign(tslib_1.__assign({}, file), { id: userFileId });
        store.dispatch(finalizeUpload_1.finalizeUpload(uploadedFile, tenantFileId, source));
    };
    // Handle cloud upload fail
    var handleRemoteUploadFailMessage = function (file, data) {
        store.dispatch(sendUploadEvent_1.sendUploadEvent({
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