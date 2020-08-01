import { isSendUploadEventAction } from '../actions/sendUploadEvent';
import { copyMediaFileForUpload } from '../../domain/file';
import { handleError } from '../../util/handleError';
export default function (eventEmitter) {
    return function () { return function (next) { return function (action) {
        if (isSendUploadEventAction(action)) {
            var _a = action.payload, event_1 = _a.event, fileId = _a.fileId;
            switch (event_1.name) {
                case 'upload-preview-update': {
                    var preview = event_1.data.preview;
                    var file = copyMediaFileForUpload(event_1.data.file, fileId);
                    eventEmitter.emitUploadPreviewUpdate(file, preview);
                    break;
                }
                case 'upload-end': {
                    var file = copyMediaFileForUpload(event_1.data.file, fileId);
                    eventEmitter.emitUploadEnd(file);
                    break;
                }
                case 'upload-error': {
                    var error = event_1.data.error;
                    eventEmitter.emitUploadError(fileId, error);
                    handleError(error.name, error.description);
                    break;
                }
            }
        }
        return next(action);
    }; }; };
}
//# sourceMappingURL=sendUploadEvent.js.map