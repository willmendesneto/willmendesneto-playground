import { UNLINK_ACCOUNT, } from '../actions/unlinkCloudAccount';
export default function (state, action) {
    if (action.type === UNLINK_ACCOUNT) {
        const accounts = state.accounts.then((accounts) => accounts.slice().filter(account => account.id !== action.account.id));
        return { ...state, accounts };
    }
    else {
        return state;
    }
}
//# sourceMappingURL=accountUnlink.js.map