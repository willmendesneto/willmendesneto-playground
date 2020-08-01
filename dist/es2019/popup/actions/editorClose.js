export const EDITOR_CLOSE = 'EDITOR_CLOSE';
export function isEditorCloseAction(action) {
    return action.type === EDITOR_CLOSE;
}
export function editorClose(selection) {
    return {
        type: EDITOR_CLOSE,
        selection,
    };
}
//# sourceMappingURL=editorClose.js.map