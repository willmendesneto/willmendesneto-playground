import { isEditorShowErrorAction } from '../actions/editorShowError';
export default function editorShowError(state, action) {
    if (isEditorShowErrorAction(action)) {
        const { editorData } = state;
        const { error } = action;
        return {
            ...state,
            editorData: {
                ...editorData,
                error,
            },
        };
    }
    return state;
}
//# sourceMappingURL=editorShowError.js.map