export const EDITOR_SHOW_ERROR = 'EDITOR_SHOW_ERROR';
export function isEditorShowErrorAction(action) {
    return action.type === EDITOR_SHOW_ERROR;
}
export function editorShowError(message, retryHandler) {
    return {
        type: EDITOR_SHOW_ERROR,
        error: {
            message,
            retryHandler,
        },
    };
}
//# sourceMappingURL=editorShowError.js.map