import { isFileClickAction } from '../actions/fileClick';
export default function fileClick(state, action) {
    if (isFileClickAction(action)) {
        const { file } = action;
        const { selectedItems, config: { singleSelect = false }, } = state;
        const itemFound = selectedItems.some(item => item.id === file.id);
        if (itemFound) {
            return {
                ...state,
                selectedItems: selectedItems.filter(item => item.id !== file.id),
            };
        }
        else if (singleSelect) {
            return {
                ...state,
                selectedItems: [file],
            };
        }
        else {
            return {
                ...state,
                selectedItems: [...selectedItems, file],
            };
        }
    }
    else {
        return state;
    }
}
//# sourceMappingURL=fileClick.js.map