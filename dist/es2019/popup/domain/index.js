export const isRemoteCloudAccount = (serviceName) => {
    return serviceName === 'google' || serviceName === 'dropbox';
};
export const isServiceFolder = (item) => {
    return item.mimeType === 'application/vnd.atlassian.mediapicker.folder';
};
export const isServiceFile = (item) => {
    return item.mimeType !== 'application/vnd.atlassian.mediapicker.folder';
};
//# sourceMappingURL=index.js.map