import { GenericEventEmitter } from '../util/eventEmitter';
export class UploadComponent extends GenericEventEmitter {
    emitPluginItemsInserted(selectedPluginItems) {
        const payload = selectedPluginItems.map(item => {
            return {
                pluginName: item.serviceName,
                pluginFile: {
                    id: item.id,
                    metadata: item.metadata,
                },
            };
        });
        this.emit('plugin-items-inserted', payload);
    }
    emitUploadsStart(files) {
        this.emit('uploads-start', {
            files,
        });
    }
    emitUploadPreviewUpdate(file, preview) {
        this.emit('upload-preview-update', {
            file,
            preview,
        });
    }
    emitUploadEnd(file) {
        this.emit('upload-end', { file });
    }
    emitUploadError(fileId, error) {
        this.emit('upload-error', {
            fileId,
            error,
        });
    }
}
//# sourceMappingURL=component.js.map