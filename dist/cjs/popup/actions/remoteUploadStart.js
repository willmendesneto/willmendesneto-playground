"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOTE_UPLOAD_START = 'REMOTE_UPLOAD_START';
function remoteUploadStart(tenantFileId) {
    return {
        type: exports.REMOTE_UPLOAD_START,
        tenantFileId: tenantFileId,
    };
}
exports.remoteUploadStart = remoteUploadStart;
//# sourceMappingURL=remoteUploadStart.js.map