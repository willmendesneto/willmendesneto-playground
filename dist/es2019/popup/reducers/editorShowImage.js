import { isEditorShowImageAction, } from '../actions/editorShowImage';
export default function editorShowImage(state, action) {
    if (isEditorShowImageAction(action)) {
        const { editorData } = state;
        const { imageUrl } = action;
        const originalFile = action.originalFile || (editorData && editorData.originalFile);
        return {
            ...state,
            editorData: {
                imageUrl,
                originalFile,
            },
        };
    }
    return state;
}
//# sourceMappingURL=editorShowImage.js.map