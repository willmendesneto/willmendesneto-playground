export const CANCEL_UPLOAD = 'CANCEL_UPLOAD';
export function isCancelUploadAction(action) {
    return action.type === CANCEL_UPLOAD;
}
export function cancelUpload(payload) {
    return {
        type: CANCEL_UPLOAD,
        payload,
    };
}
//# sourceMappingURL=cancelUpload.js.map