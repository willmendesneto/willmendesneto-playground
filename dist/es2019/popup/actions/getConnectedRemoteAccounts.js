export const GET_CONNECTED_REMOTE_ACCOUNTS = 'GET_CONNECTED_REMOTE_ACCOUNTS';
export const GET_CONNECTED_REMOTE_ACCOUNTS_FAILED = 'GET_CONNECTED_REMOTE_ACCOUNTS_FAILED';
export const isGetConnectedRemoteAccountsAction = (action) => {
    return action.type === GET_CONNECTED_REMOTE_ACCOUNTS;
};
export const getConnectedRemoteAccounts = () => {
    return {
        type: GET_CONNECTED_REMOTE_ACCOUNTS,
    };
};
export const connectedRemoteAccountsFailed = () => {
    return {
        type: GET_CONNECTED_REMOTE_ACCOUNTS_FAILED,
    };
};
export function isConnectedRemoteAccountFailedAction(action) {
    return action.type === GET_CONNECTED_REMOTE_ACCOUNTS_FAILED;
}
//# sourceMappingURL=getConnectedRemoteAccounts.js.map