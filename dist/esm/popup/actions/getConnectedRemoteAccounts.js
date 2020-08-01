export var GET_CONNECTED_REMOTE_ACCOUNTS = 'GET_CONNECTED_REMOTE_ACCOUNTS';
export var GET_CONNECTED_REMOTE_ACCOUNTS_FAILED = 'GET_CONNECTED_REMOTE_ACCOUNTS_FAILED';
export var isGetConnectedRemoteAccountsAction = function (action) {
    return action.type === GET_CONNECTED_REMOTE_ACCOUNTS;
};
export var getConnectedRemoteAccounts = function () {
    return {
        type: GET_CONNECTED_REMOTE_ACCOUNTS,
    };
};
export var connectedRemoteAccountsFailed = function () {
    return {
        type: GET_CONNECTED_REMOTE_ACCOUNTS_FAILED,
    };
};
export function isConnectedRemoteAccountFailedAction(action) {
    return action.type === GET_CONNECTED_REMOTE_ACCOUNTS_FAILED;
}
//# sourceMappingURL=getConnectedRemoteAccounts.js.map