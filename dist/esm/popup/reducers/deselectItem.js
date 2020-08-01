import { __assign } from "tslib";
import { isDeselectItemAction } from '../actions';
export default function deselectItem(state, action) {
    if (isDeselectItemAction(action)) {
        var selectedItems = state.selectedItems;
        if (selectedItems) {
            return __assign(__assign({}, state), { selectedItems: selectedItems.filter(function (item) { return item.id !== action.id; }) });
        }
    }
    return state;
}
//# sourceMappingURL=deselectItem.js.map