export var REMOTE_UPLOAD_START = 'REMOTE_UPLOAD_START';
export function remoteUploadStart(tenantFileId) {
    return {
        type: REMOTE_UPLOAD_START,
        tenantFileId: tenantFileId,
    };
}
//# sourceMappingURL=remoteUploadStart.js.map