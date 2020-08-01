import { TRACK_EVENT_TYPE, OPERATIONAL_EVENT_TYPE, } from '@atlaskit/analytics-gas-types';
import { isHandleCloudFetchingEventAction } from '../../actions/handleCloudFetchingEvent';
const commonPayload = {
    actionSubject: 'mediaUpload',
    actionSubjectId: 'cloudMedia',
};
const fileAttributes = (file) => ({
    fileId: file.id,
    fileSize: file.size,
    fileMimetype: file.type,
    fileSource: 'mediapicker',
});
export default (action, store) => {
    if (isHandleCloudFetchingEventAction(action)) {
        const { event, payload, file } = action;
        const remoteUpload = store.getState().remoteUploads[payload.tenantFileId];
        const { timeStarted } = remoteUpload || { timeStarted: undefined };
        const uploadDurationMsec = timeStarted !== undefined ? Date.now() - timeStarted : -1;
        const commonAttributes = {
            sourceType: 'cloud',
            serviceName: payload.serviceName,
        };
        if (event === 'RemoteUploadStart') {
            return [
                {
                    action: 'commenced',
                    ...commonPayload,
                    attributes: {
                        fileAttributes: fileAttributes(file),
                        ...commonAttributes,
                    },
                    eventType: OPERATIONAL_EVENT_TYPE,
                },
            ];
        }
        else if (event === 'RemoteUploadEnd') {
            return [
                {
                    action: 'uploaded',
                    ...commonPayload,
                    attributes: {
                        fileAttributes: fileAttributes(file),
                        ...commonAttributes,
                        status: 'success',
                        uploadDurationMsec,
                    },
                    eventType: TRACK_EVENT_TYPE,
                },
            ];
        }
        else if (event === 'RemoteUploadFail') {
            return [
                {
                    action: 'uploaded',
                    ...commonPayload,
                    attributes: {
                        fileAttributes: fileAttributes(file),
                        ...commonAttributes,
                        status: 'fail',
                        uploadDurationMsec,
                        failReason: payload.description,
                    },
                    eventType: TRACK_EVENT_TYPE,
                },
            ];
        }
        else {
            return [];
        }
    }
};
//# sourceMappingURL=handleCloudFetchingEventHandler.js.map