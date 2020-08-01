import { UploadComponent } from './component';
import { UploadServiceImpl } from '../service/uploadServiceImpl';
export class LocalUploadComponent extends UploadComponent {
    constructor(mediaClient, config) {
        super();
        this.addFiles = (files) => this.uploadService.addFiles(files);
        this.onFilesAdded = ({ files }) => {
            this.emitUploadsStart(files);
        };
        this.onFilePreviewUpdate = ({ file, preview, }) => {
            this.emitUploadPreviewUpdate(file, preview);
        };
        this.onFileConverting = ({ file }) => {
            this.emitUploadEnd(file);
        };
        this.onUploadError = ({ fileId, error, }) => {
            this.emitUploadError(fileId, error);
        };
        const tenantUploadParams = config.uploadParams;
        this.mediaClient = mediaClient;
        const { shouldCopyFileToRecents = true } = config;
        this.uploadService = new UploadServiceImpl(this.mediaClient, tenantUploadParams, shouldCopyFileToRecents);
        this.config = config;
        this.uploadService.on('files-added', this.onFilesAdded);
        this.uploadService.on('file-preview-update', this.onFilePreviewUpdate);
        this.uploadService.on('file-converting', this.onFileConverting);
        this.uploadService.on('file-upload-error', this.onUploadError);
    }
    cancel(uniqueIdentifier) {
        this.uploadService.cancel(uniqueIdentifier);
    }
    setUploadParams(uploadParams) {
        this.uploadService.setUploadParams(uploadParams);
    }
}
//# sourceMappingURL=localUpload.js.map