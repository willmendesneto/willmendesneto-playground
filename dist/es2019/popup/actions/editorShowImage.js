export const EDITOR_SHOW_IMAGE = 'EDITOR_SHOW_IMAGE';
export function isEditorShowImageAction(action) {
    return action.type === EDITOR_SHOW_IMAGE;
}
export function editorShowImage(imageUrl, originalFile) {
    return {
        type: EDITOR_SHOW_IMAGE,
        imageUrl,
        originalFile,
    };
}
//# sourceMappingURL=editorShowImage.js.map