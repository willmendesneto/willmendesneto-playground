"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cancelUpload_1 = require("../actions/cancelUpload");
exports.default = (function (store) { return function (next) { return function (action) {
    if (cancelUpload_1.isCancelUploadAction(action)) {
        var tenantFileId = action.payload.tenantFileId;
        var onCancelUpload = store.getState().onCancelUpload;
        onCancelUpload(tenantFileId);
    }
    return next(action);
}; }; });
//# sourceMappingURL=cancelUpload.js.map