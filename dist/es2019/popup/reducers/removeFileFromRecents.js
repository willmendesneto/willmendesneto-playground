import { isRemoveFileFromRecentsAction } from '../actions/removeFileFromRecents';
export default function removeFileFromRecents(state, action) {
    if (!isRemoveFileFromRecentsAction(action)) {
        return state;
    }
    const selectedItems = state.selectedItems.filter(item => item.id !== action.id);
    const uploads = Object.keys(state.uploads)
        .filter(selectedItemId => state.uploads[selectedItemId].file.metadata.id !== action.id)
        .reduce((uploadObject, selectedItemId) => ({
        ...uploadObject,
        [selectedItemId]: state.uploads[selectedItemId],
    }), {});
    return {
        ...state,
        selectedItems,
        uploads,
    };
}
//# sourceMappingURL=removeFileFromRecents.js.map