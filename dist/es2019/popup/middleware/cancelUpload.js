import { isCancelUploadAction } from '../actions/cancelUpload';
export default (store) => (next) => (action) => {
    if (isCancelUploadAction(action)) {
        const { tenantFileId } = action.payload;
        const { onCancelUpload } = store.getState();
        onCancelUpload(tenantFileId);
    }
    return next(action);
};
//# sourceMappingURL=cancelUpload.js.map