import { __assign } from "tslib";
import { isConnectedRemoteAccountFailedAction } from '../actions/getConnectedRemoteAccounts';
export var connectedRemoteAccountsFailed = function (state, action) {
    if (isConnectedRemoteAccountFailedAction(action)) {
        return __assign(__assign({}, state), { view: __assign(__assign({}, state.view), { isLoading: false, hasError: true }) });
    }
    else {
        return state;
    }
};
//# sourceMappingURL=connectedRemoteAccountsFailed.js.map