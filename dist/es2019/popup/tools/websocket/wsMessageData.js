export const isRemoteUploadStartData = (data) => {
    return data && data.type === 'RemoteUploadStart';
};
export const isRemoteUploadProgressData = (data) => {
    return data.type === 'RemoteUploadProgress';
};
export const isRemoteUploadEndData = (data) => {
    return data.type === 'RemoteUploadEnd';
};
const isErrorData = (data) => {
    return data.type === 'Error';
};
export const isRemoteUploadErrorData = (data) => {
    return isErrorData(data) && data.error === 'RemoteUploadFail';
};
export const isNotifyMetadata = (data) => {
    return data.type === 'NotifyMetadata';
};
//# sourceMappingURL=wsMessageData.js.map