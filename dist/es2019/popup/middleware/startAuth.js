import { updateServiceList } from '../actions/updateServiceList';
import { START_AUTH } from '../actions/startAuth';
import { changeAccount } from '../actions/changeAccount';
export const startCloudAccountOAuthFlow = (fetcher, cloudService) => (store) => (next) => (action) => {
    if (action.type === START_AUTH) {
        const { redirectUrl, userMediaClient } = store.getState();
        const { serviceName } = action;
        const accounts = cloudService
            .startAuth(redirectUrl, serviceName)
            .then(() => userMediaClient.config.authProvider())
            .then(auth => fetcher.getServiceList(auth));
        store.dispatch(updateServiceList(accounts));
        accounts.then((accounts) => {
            const selectedAccount = accounts.find(account => account.type === serviceName);
            if (selectedAccount) {
                store.dispatch(changeAccount(serviceName, selectedAccount.id));
            }
        });
    }
    return next(action);
};
//# sourceMappingURL=startAuth.js.map