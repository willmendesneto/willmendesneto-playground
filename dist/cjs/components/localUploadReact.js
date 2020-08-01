"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var perf_marks_1 = require("perf-marks");
var component_1 = require("./component");
var uploadServiceImpl_1 = require("../service/uploadServiceImpl");
var analytics_gas_types_1 = require("@atlaskit/analytics-gas-types");
var version_json_1 = require("../version.json");
var media_picker_analytics_error_boundary_1 = require("./media-picker-analytics-error-boundary");
var basePayload = function (sizeAndType, additionalAttributes) {
    if (additionalAttributes === void 0) { additionalAttributes = {}; }
    return ({
        actionSubject: 'mediaUpload',
        actionSubjectId: 'localMedia',
        attributes: tslib_1.__assign(tslib_1.__assign({ packageName: version_json_1.name, sourceType: 'local' }, (sizeAndType
            ? {
                fileAttributes: {
                    fileSize: sizeAndType.size,
                    fileMimetype: sizeAndType.type,
                },
            }
            : {})), additionalAttributes),
    });
};
var LocalUploadComponentReact = /** @class */ (function (_super) {
    tslib_1.__extends(LocalUploadComponentReact, _super);
    function LocalUploadComponentReact(props) {
        var _this = _super.call(this, props) || this;
        _this.uploadComponent = new component_1.UploadComponent();
        _this.fireCommencedEvent = function (payload) {
            payload.files.forEach(function (_a) {
                var id = _a.id, size = _a.size, type = _a.type;
                perf_marks_1.start("MediaPicker.fireUpload." + id);
                _this.createAndFireAnalyticsEvent(tslib_1.__assign(tslib_1.__assign({}, basePayload({ size: size, type: type })), { action: 'commenced', eventType: analytics_gas_types_1.OPERATIONAL_EVENT_TYPE }));
            });
        };
        _this.fireUploadSucceeded = function (payload) {
            var _a = payload.file, size = _a.size, type = _a.type, id = _a.id;
            var _b = perf_marks_1.end("MediaPicker.fireUpload." + id).duration, duration = _b === void 0 ? -1 : _b;
            _this.createAndFireAnalyticsEvent(tslib_1.__assign(tslib_1.__assign({}, basePayload({ size: size, type: type }, {
                status: 'success',
                uploadDurationMsec: duration,
            })), { action: 'uploaded', eventType: analytics_gas_types_1.TRACK_EVENT_TYPE }));
        };
        _this.fireUploadFailed = function (payload) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, duration;
            return tslib_1.__generator(this, function (_b) {
                _a = perf_marks_1.end("MediaPicker.fireUpload." + payload.fileId).duration, duration = _a === void 0 ? -1 : _a;
                this.createAndFireAnalyticsEvent(tslib_1.__assign(tslib_1.__assign({}, basePayload(undefined, {
                    status: 'fail',
                    failReason: payload.error.description,
                    uploadDurationMsec: duration,
                })), { action: 'uploaded', eventType: analytics_gas_types_1.TRACK_EVENT_TYPE }));
                return [2 /*return*/];
            });
        }); };
        _this.createAndFireAnalyticsEvent = function (payload) {
            var createAnalyticsEvent = _this.props.createAnalyticsEvent;
            if (createAnalyticsEvent) {
                createAnalyticsEvent(payload).fire(media_picker_analytics_error_boundary_1.ANALYTICS_MEDIA_CHANNEL);
            }
        };
        _this.cancel = function (uniqueIdentifier) {
            _this.uploadService.cancel(uniqueIdentifier);
        };
        _this.onFilesAdded = function (_a) {
            var files = _a.files;
            _this.uploadComponent.emitUploadsStart(files);
        };
        _this.onFilePreviewUpdate = function (_a) {
            var file = _a.file, preview = _a.preview;
            _this.uploadComponent.emitUploadPreviewUpdate(file, preview);
        };
        _this.onFileConverting = function (_a) {
            var file = _a.file;
            _this.uploadComponent.emitUploadEnd(file);
        };
        _this.onUploadError = function (_a) {
            var fileId = _a.fileId, error = _a.error;
            _this.uploadComponent.emitUploadError(fileId, error);
        };
        var _a = _this.props, mediaClient = _a.mediaClient, config = _a.config, onUploadsStart = _a.onUploadsStart, onPreviewUpdate = _a.onPreviewUpdate, onEnd = _a.onEnd, onError = _a.onError;
        var tenantUploadParams = config.uploadParams;
        var _b = config.shouldCopyFileToRecents, shouldCopyFileToRecents = _b === void 0 ? true : _b;
        _this.uploadComponent.on('uploads-start', _this.fireCommencedEvent);
        _this.uploadComponent.on('upload-end', _this.fireUploadSucceeded);
        _this.uploadComponent.on('upload-error', _this.fireUploadFailed);
        if (onUploadsStart) {
            _this.uploadComponent.on('uploads-start', onUploadsStart);
        }
        if (onPreviewUpdate) {
            _this.uploadComponent.on('upload-preview-update', onPreviewUpdate);
        }
        if (onEnd) {
            _this.uploadComponent.on('upload-end', onEnd);
        }
        if (onError) {
            _this.uploadComponent.on('upload-error', onError);
        }
        _this.uploadService = new uploadServiceImpl_1.UploadServiceImpl(mediaClient, tenantUploadParams, shouldCopyFileToRecents);
        _this.uploadService.on('files-added', _this.onFilesAdded);
        _this.uploadService.on('file-preview-update', _this.onFilePreviewUpdate);
        _this.uploadService.on('file-converting', _this.onFileConverting);
        _this.uploadService.on('file-upload-error', _this.onUploadError);
        return _this;
    }
    LocalUploadComponentReact.prototype.setUploadParams = function (uploadParams) {
        this.uploadService.setUploadParams(uploadParams);
    };
    return LocalUploadComponentReact;
}(react_1.Component));
exports.LocalUploadComponentReact = LocalUploadComponentReact;
//# sourceMappingURL=localUploadReact.js.map