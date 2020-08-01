export const CHANGE_CLOUD_ACCOUNT_FOLDER = 'CHANGE_CLOUD_ACCOUNT_FOLDER';
export function changeCloudAccountFolder(serviceName, accountId, path) {
    return {
        type: CHANGE_CLOUD_ACCOUNT_FOLDER,
        serviceName,
        accountId,
        path,
    };
}
export function isChangeCloudAccountFolderAction(action) {
    return action.type === CHANGE_CLOUD_ACCOUNT_FOLDER;
}
//# sourceMappingURL=changeCloudAccountFolder.js.map