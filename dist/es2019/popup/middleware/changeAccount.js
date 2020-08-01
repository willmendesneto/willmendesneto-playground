import { isChangeAccountAction } from '../actions/changeAccount';
import { changeCloudAccountFolder } from '../actions/changeCloudAccountFolder';
import { isRemoteCloudAccount } from '../domain';
export default (store) => (next) => (action) => {
    if (isChangeAccountAction(action)) {
        const { serviceName, accountId } = action;
        if (isRemoteCloudAccount(serviceName) && accountId !== '') {
            store.dispatch(changeCloudAccountFolder(serviceName, accountId, []));
        }
    }
    return next(action);
};
//# sourceMappingURL=changeAccount.js.map