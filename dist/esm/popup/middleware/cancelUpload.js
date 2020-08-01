import { isCancelUploadAction } from '../actions/cancelUpload';
export default (function (store) { return function (next) { return function (action) {
    if (isCancelUploadAction(action)) {
        var tenantFileId = action.payload.tenantFileId;
        var onCancelUpload = store.getState().onCancelUpload;
        onCancelUpload(tenantFileId);
    }
    return next(action);
}; }; });
//# sourceMappingURL=cancelUpload.js.map