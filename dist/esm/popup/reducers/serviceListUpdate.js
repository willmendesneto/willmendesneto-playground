import { __assign } from "tslib";
import { UPDATE_SERVICE_LIST, } from '../actions/updateServiceList';
export default function serviceListUpdate(state, action) {
    if (action.type === UPDATE_SERVICE_LIST) {
        return __assign(__assign({}, state), { accounts: action.accounts, view: __assign(__assign({}, state.view), { isLoading: false, hasError: false }) });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=serviceListUpdate.js.map