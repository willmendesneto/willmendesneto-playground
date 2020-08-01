"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eventEmitter_1 = require("../util/eventEmitter");
var UploadComponent = /** @class */ (function (_super) {
    tslib_1.__extends(UploadComponent, _super);
    function UploadComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UploadComponent.prototype.emitPluginItemsInserted = function (selectedPluginItems) {
        var payload = selectedPluginItems.map(function (item) {
            return {
                pluginName: item.serviceName,
                pluginFile: {
                    id: item.id,
                    metadata: item.metadata,
                },
            };
        });
        this.emit('plugin-items-inserted', payload);
    };
    UploadComponent.prototype.emitUploadsStart = function (files) {
        this.emit('uploads-start', {
            files: files,
        });
    };
    UploadComponent.prototype.emitUploadPreviewUpdate = function (file, preview) {
        this.emit('upload-preview-update', {
            file: file,
            preview: preview,
        });
    };
    UploadComponent.prototype.emitUploadEnd = function (file) {
        this.emit('upload-end', { file: file });
    };
    UploadComponent.prototype.emitUploadError = function (fileId, error) {
        this.emit('upload-error', {
            fileId: fileId,
            error: error,
        });
    };
    return UploadComponent;
}(eventEmitter_1.GenericEventEmitter));
exports.UploadComponent = UploadComponent;
//# sourceMappingURL=component.js.map