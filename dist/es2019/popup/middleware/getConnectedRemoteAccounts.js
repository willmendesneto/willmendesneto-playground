import { updateServiceList } from '../actions/updateServiceList';
import { isGetConnectedRemoteAccountsAction, connectedRemoteAccountsFailed, } from '../actions/getConnectedRemoteAccounts';
export const getConnectedRemoteAccounts = (fetcher) => (store) => (next) => (action) => {
    if (isGetConnectedRemoteAccountsAction(action)) {
        const { userMediaClient } = store.getState();
        const servicesList = userMediaClient.config
            .authProvider()
            .then(auth => fetcher.getServiceList(auth))
            .catch(() => {
            store.dispatch(connectedRemoteAccountsFailed());
            return [];
        });
        store.dispatch(updateServiceList(servicesList));
    }
    return next(action);
};
//# sourceMappingURL=getConnectedRemoteAccounts.js.map