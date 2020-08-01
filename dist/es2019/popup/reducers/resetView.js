import { isResetViewAction } from '../actions/resetView';
export default function resetView(state, action) {
    if (isResetViewAction(action)) {
        return {
            ...state,
            selectedItems: [],
            uploads: {},
        };
    }
    else {
        return state;
    }
}
//# sourceMappingURL=resetView.js.map