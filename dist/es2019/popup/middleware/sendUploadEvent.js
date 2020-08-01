import { isSendUploadEventAction } from '../actions/sendUploadEvent';
import { copyMediaFileForUpload } from '../../domain/file';
import { handleError } from '../../util/handleError';
export default function (eventEmitter) {
    return () => (next) => (action) => {
        if (isSendUploadEventAction(action)) {
            const { event, fileId } = action.payload;
            switch (event.name) {
                case 'upload-preview-update': {
                    const { preview } = event.data;
                    const file = copyMediaFileForUpload(event.data.file, fileId);
                    eventEmitter.emitUploadPreviewUpdate(file, preview);
                    break;
                }
                case 'upload-end': {
                    const file = copyMediaFileForUpload(event.data.file, fileId);
                    eventEmitter.emitUploadEnd(file);
                    break;
                }
                case 'upload-error': {
                    const { error } = event.data;
                    eventEmitter.emitUploadError(fileId, error);
                    handleError(error.name, error.description);
                    break;
                }
            }
        }
        return next(action);
    };
}
//# sourceMappingURL=sendUploadEvent.js.map