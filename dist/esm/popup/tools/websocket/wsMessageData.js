export var isRemoteUploadStartData = function (data) {
    return data && data.type === 'RemoteUploadStart';
};
export var isRemoteUploadProgressData = function (data) {
    return data.type === 'RemoteUploadProgress';
};
export var isRemoteUploadEndData = function (data) {
    return data.type === 'RemoteUploadEnd';
};
var isErrorData = function (data) {
    return data.type === 'Error';
};
export var isRemoteUploadErrorData = function (data) {
    return isErrorData(data) && data.error === 'RemoteUploadFail';
};
export var isNotifyMetadata = function (data) {
    return data.type === 'NotifyMetadata';
};
//# sourceMappingURL=wsMessageData.js.map