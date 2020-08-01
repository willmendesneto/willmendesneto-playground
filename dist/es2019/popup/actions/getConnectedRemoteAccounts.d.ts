import { Action } from 'redux';
export declare const GET_CONNECTED_REMOTE_ACCOUNTS = "GET_CONNECTED_REMOTE_ACCOUNTS";
export declare const GET_CONNECTED_REMOTE_ACCOUNTS_FAILED = "GET_CONNECTED_REMOTE_ACCOUNTS_FAILED";
export interface GetConnectedRemoteAccountsAction extends Action {
    type: 'GET_CONNECTED_REMOTE_ACCOUNTS';
}
export declare const isGetConnectedRemoteAccountsAction: (action: Action) => action is GetConnectedRemoteAccountsAction;
export declare const getConnectedRemoteAccounts: () => GetConnectedRemoteAccountsAction;
export interface GetConnectedRemoteAccountsActionFailed extends Action {
    type: 'GET_CONNECTED_REMOTE_ACCOUNTS_FAILED';
}
export declare const connectedRemoteAccountsFailed: () => GetConnectedRemoteAccountsActionFailed;
export declare function isConnectedRemoteAccountFailedAction(action: Action): action is GetConnectedRemoteAccountsActionFailed;
