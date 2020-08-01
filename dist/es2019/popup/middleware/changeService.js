import { isChangeServiceAction } from '../actions/changeService';
import { changeAccount } from '../actions/changeAccount';
import { getConnectedRemoteAccounts } from '../actions/getConnectedRemoteAccounts';
const loggableServices = ['google', 'dropbox'];
export const changeService = (store) => (next) => async (action) => {
    if (isChangeServiceAction(action)) {
        const { serviceName } = action;
        const { accountId: existingAccountId } = store.getState().view.service;
        if (loggableServices.indexOf(serviceName) !== -1) {
            store.dispatch(getConnectedRemoteAccounts());
        }
        const firstAccount = (await store.getState().accounts).find((account) => account.type === action.serviceName);
        const accountId = existingAccountId || (firstAccount ? firstAccount.id : '');
        store.dispatch(changeAccount(serviceName, accountId));
    }
    return next(action);
};
//# sourceMappingURL=changeService.js.map