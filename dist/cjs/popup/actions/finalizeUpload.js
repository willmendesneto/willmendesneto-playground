"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FINALIZE_UPLOAD = 'FINALIZE_UPLOAD';
function isFinalizeUploadAction(action) {
    return action.type === exports.FINALIZE_UPLOAD;
}
exports.isFinalizeUploadAction = isFinalizeUploadAction;
function finalizeUpload(file, replaceFileId, source) {
    return {
        type: exports.FINALIZE_UPLOAD,
        file: file,
        replaceFileId: replaceFileId,
        source: source,
    };
}
exports.finalizeUpload = finalizeUpload;
//# sourceMappingURL=finalizeUpload.js.map