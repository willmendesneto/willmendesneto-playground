import { updateServiceList } from '../actions/updateServiceList';
import { isGetConnectedRemoteAccountsAction, connectedRemoteAccountsFailed, } from '../actions/getConnectedRemoteAccounts';
export var getConnectedRemoteAccounts = function (fetcher) { return function (store) { return function (next) { return function (action) {
    if (isGetConnectedRemoteAccountsAction(action)) {
        var userMediaClient = store.getState().userMediaClient;
        var servicesList = userMediaClient.config
            .authProvider()
            .then(function (auth) { return fetcher.getServiceList(auth); })
            .catch(function () {
            store.dispatch(connectedRemoteAccountsFailed());
            return [];
        });
        store.dispatch(updateServiceList(servicesList));
    }
    return next(action);
}; }; }; };
//# sourceMappingURL=getConnectedRemoteAccounts.js.map