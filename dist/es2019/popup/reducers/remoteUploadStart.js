import { REMOTE_UPLOAD_START, } from '../actions/remoteUploadStart';
export default function remoteUploadStart(state, action) {
    if (action.type === REMOTE_UPLOAD_START) {
        const { tenantFileId } = action;
        const remoteUploads = { ...state.remoteUploads };
        remoteUploads[tenantFileId] = {
            timeStarted: Date.now(),
        };
        return { ...state, remoteUploads };
    }
    return state;
}
//# sourceMappingURL=remoteUploadStart.js.map