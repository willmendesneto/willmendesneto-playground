import { isEditorCloseAction } from '../actions';
export default function editorClose(state, action) {
    if (isEditorCloseAction(action)) {
        return {
            ...state,
            editorData: undefined,
        };
    }
    return state;
}
//# sourceMappingURL=editorClose.js.map