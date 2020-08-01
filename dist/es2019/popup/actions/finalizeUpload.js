export const FINALIZE_UPLOAD = 'FINALIZE_UPLOAD';
export function isFinalizeUploadAction(action) {
    return action.type === FINALIZE_UPLOAD;
}
export function finalizeUpload(file, replaceFileId, source) {
    return {
        type: FINALIZE_UPLOAD,
        file,
        replaceFileId,
        source,
    };
}
//# sourceMappingURL=finalizeUpload.js.map