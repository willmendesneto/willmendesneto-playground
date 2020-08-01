"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_CONNECTED_REMOTE_ACCOUNTS = 'GET_CONNECTED_REMOTE_ACCOUNTS';
exports.GET_CONNECTED_REMOTE_ACCOUNTS_FAILED = 'GET_CONNECTED_REMOTE_ACCOUNTS_FAILED';
exports.isGetConnectedRemoteAccountsAction = function (action) {
    return action.type === exports.GET_CONNECTED_REMOTE_ACCOUNTS;
};
exports.getConnectedRemoteAccounts = function () {
    return {
        type: exports.GET_CONNECTED_REMOTE_ACCOUNTS,
    };
};
exports.connectedRemoteAccountsFailed = function () {
    return {
        type: exports.GET_CONNECTED_REMOTE_ACCOUNTS_FAILED,
    };
};
function isConnectedRemoteAccountFailedAction(action) {
    return action.type === exports.GET_CONNECTED_REMOTE_ACCOUNTS_FAILED;
}
exports.isConnectedRemoteAccountFailedAction = isConnectedRemoteAccountFailedAction;
//# sourceMappingURL=getConnectedRemoteAccounts.js.map