export const REQUEST_UNLINK_CLOUD_ACCOUNT = 'ACCOUNT_UNLINK_CLOUD_REQUEST';
export function requestUnlinkCloudAccount(account) {
    return {
        type: REQUEST_UNLINK_CLOUD_ACCOUNT,
        account,
    };
}
export const UNLINK_ACCOUNT = 'ACCOUNT_CLOUD_UNLINK';
export function unlinkCloudAccount(account) {
    return {
        type: UNLINK_ACCOUNT,
        account,
    };
}
//# sourceMappingURL=unlinkCloudAccount.js.map