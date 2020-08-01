import { __assign } from "tslib";
import { isRemoveFileFromRecentsAction } from '../actions/removeFileFromRecents';
export default function removeFileFromRecents(state, action) {
    if (!isRemoveFileFromRecentsAction(action)) {
        return state;
    }
    var selectedItems = state.selectedItems.filter(function (item) { return item.id !== action.id; });
    var uploads = Object.keys(state.uploads)
        .filter(function (selectedItemId) {
        return state.uploads[selectedItemId].file.metadata.id !== action.id;
    })
        .reduce(function (uploadObject, selectedItemId) {
        var _a;
        return (__assign(__assign({}, uploadObject), (_a = {}, _a[selectedItemId] = state.uploads[selectedItemId], _a)));
    }, {});
    return __assign(__assign({}, state), { selectedItems: selectedItems,
        uploads: uploads });
}
//# sourceMappingURL=removeFileFromRecents.js.map