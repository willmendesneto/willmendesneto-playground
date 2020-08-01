import { REQUEST_UNLINK_CLOUD_ACCOUNT, } from '../actions/unlinkCloudAccount';
import { changeService } from '../actions/changeService';
import { unlinkCloudAccount } from '../actions/unlinkCloudAccount';
export default (fetcher) => (store) => (next) => (action) => {
    if (action.type === REQUEST_UNLINK_CLOUD_ACCOUNT) {
        const { userMediaClient } = store.getState();
        userMediaClient.config
            .authProvider()
            .then(auth => fetcher.unlinkCloudAccount(auth, action.account.id))
            .then(() => {
            store.dispatch(unlinkCloudAccount(action.account));
            store.dispatch(changeService(action.account.name));
        });
    }
    return next(action);
};
//# sourceMappingURL=unlinkCloudAccount.js.map