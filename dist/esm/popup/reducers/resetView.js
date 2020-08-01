import { __assign } from "tslib";
import { isResetViewAction } from '../actions/resetView';
export default function resetView(state, action) {
    if (isResetViewAction(action)) {
        return __assign(__assign({}, state), { selectedItems: [], uploads: {} });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=resetView.js.map