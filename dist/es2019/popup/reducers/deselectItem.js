import { isDeselectItemAction } from '../actions';
export default function deselectItem(state, action) {
    if (isDeselectItemAction(action)) {
        const { selectedItems } = state;
        if (selectedItems) {
            return {
                ...state,
                selectedItems: selectedItems.filter(item => item.id !== action.id),
            };
        }
    }
    return state;
}
//# sourceMappingURL=deselectItem.js.map