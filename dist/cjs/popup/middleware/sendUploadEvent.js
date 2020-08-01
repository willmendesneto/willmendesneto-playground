"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendUploadEvent_1 = require("../actions/sendUploadEvent");
var file_1 = require("../../domain/file");
var handleError_1 = require("../../util/handleError");
function default_1(eventEmitter) {
    return function () { return function (next) { return function (action) {
        if (sendUploadEvent_1.isSendUploadEventAction(action)) {
            var _a = action.payload, event_1 = _a.event, fileId = _a.fileId;
            switch (event_1.name) {
                case 'upload-preview-update': {
                    var preview = event_1.data.preview;
                    var file = file_1.copyMediaFileForUpload(event_1.data.file, fileId);
                    eventEmitter.emitUploadPreviewUpdate(file, preview);
                    break;
                }
                case 'upload-end': {
                    var file = file_1.copyMediaFileForUpload(event_1.data.file, fileId);
                    eventEmitter.emitUploadEnd(file);
                    break;
                }
                case 'upload-error': {
                    var error = event_1.data.error;
                    eventEmitter.emitUploadError(fileId, error);
                    handleError_1.handleError(error.name, error.description);
                    break;
                }
            }
        }
        return next(action);
    }; }; };
}
exports.default = default_1;
//# sourceMappingURL=sendUploadEvent.js.map