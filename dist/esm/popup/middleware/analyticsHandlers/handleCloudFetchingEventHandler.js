import { __assign } from "tslib";
import { TRACK_EVENT_TYPE, OPERATIONAL_EVENT_TYPE, } from '@atlaskit/analytics-gas-types';
import { isHandleCloudFetchingEventAction } from '../../actions/handleCloudFetchingEvent';
var commonPayload = {
    actionSubject: 'mediaUpload',
    actionSubjectId: 'cloudMedia',
};
var fileAttributes = function (file) { return ({
    fileId: file.id,
    fileSize: file.size,
    fileMimetype: file.type,
    fileSource: 'mediapicker',
}); };
export default (function (action, store) {
    if (isHandleCloudFetchingEventAction(action)) {
        var event_1 = action.event, payload = action.payload, file = action.file;
        var remoteUpload = store.getState().remoteUploads[payload.tenantFileId];
        var timeStarted = (remoteUpload || { timeStarted: undefined }).timeStarted;
        var uploadDurationMsec = timeStarted !== undefined ? Date.now() - timeStarted : -1;
        var commonAttributes = {
            sourceType: 'cloud',
            serviceName: payload.serviceName,
        };
        if (event_1 === 'RemoteUploadStart') {
            return [
                __assign(__assign({ action: 'commenced' }, commonPayload), { attributes: __assign({ fileAttributes: fileAttributes(file) }, commonAttributes), eventType: OPERATIONAL_EVENT_TYPE }),
            ];
        }
        else if (event_1 === 'RemoteUploadEnd') {
            return [
                __assign(__assign({ action: 'uploaded' }, commonPayload), { attributes: __assign(__assign({ fileAttributes: fileAttributes(file) }, commonAttributes), { status: 'success', uploadDurationMsec: uploadDurationMsec }), eventType: TRACK_EVENT_TYPE }),
            ];
        }
        else if (event_1 === 'RemoteUploadFail') {
            return [
                __assign(__assign({ action: 'uploaded' }, commonPayload), { attributes: __assign(__assign({ fileAttributes: fileAttributes(file) }, commonAttributes), { status: 'fail', uploadDurationMsec: uploadDurationMsec, failReason: payload.description }), eventType: TRACK_EVENT_TYPE }),
            ];
        }
        else {
            return [];
        }
    }
});
//# sourceMappingURL=handleCloudFetchingEventHandler.js.map