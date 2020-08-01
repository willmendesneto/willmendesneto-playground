import { Component } from 'react';
import { start, end } from 'perf-marks';
import { UploadComponent } from './component';
import { UploadServiceImpl } from '../service/uploadServiceImpl';
import { TRACK_EVENT_TYPE, OPERATIONAL_EVENT_TYPE, } from '@atlaskit/analytics-gas-types';
import { name as packageName } from '../version.json';
import { ANALYTICS_MEDIA_CHANNEL } from './media-picker-analytics-error-boundary';
const basePayload = (sizeAndType, additionalAttributes = {}) => ({
    actionSubject: 'mediaUpload',
    actionSubjectId: 'localMedia',
    attributes: {
        packageName,
        sourceType: 'local',
        ...(sizeAndType
            ? {
                fileAttributes: {
                    fileSize: sizeAndType.size,
                    fileMimetype: sizeAndType.type,
                },
            }
            : {}),
        ...additionalAttributes,
    },
});
export class LocalUploadComponentReact extends Component {
    constructor(props) {
        super(props);
        this.uploadComponent = new UploadComponent();
        this.fireCommencedEvent = (payload) => {
            payload.files.forEach(({ id, size, type }) => {
                start(`MediaPicker.fireUpload.${id}`);
                this.createAndFireAnalyticsEvent({
                    ...basePayload({ size, type }),
                    action: 'commenced',
                    eventType: OPERATIONAL_EVENT_TYPE,
                });
            });
        };
        this.fireUploadSucceeded = (payload) => {
            const { size, type, id } = payload.file;
            const { duration = -1 } = end(`MediaPicker.fireUpload.${id}`);
            this.createAndFireAnalyticsEvent({
                ...basePayload({ size, type }, {
                    status: 'success',
                    uploadDurationMsec: duration,
                }),
                action: 'uploaded',
                eventType: TRACK_EVENT_TYPE,
            });
        };
        this.fireUploadFailed = async (payload) => {
            const { duration = -1 } = end(`MediaPicker.fireUpload.${payload.fileId}`);
            this.createAndFireAnalyticsEvent({
                ...basePayload(undefined, {
                    status: 'fail',
                    failReason: payload.error.description,
                    uploadDurationMsec: duration,
                }),
                action: 'uploaded',
                eventType: TRACK_EVENT_TYPE,
            });
        };
        this.createAndFireAnalyticsEvent = (payload) => {
            const { createAnalyticsEvent } = this.props;
            if (createAnalyticsEvent) {
                createAnalyticsEvent(payload).fire(ANALYTICS_MEDIA_CHANNEL);
            }
        };
        this.cancel = (uniqueIdentifier) => {
            this.uploadService.cancel(uniqueIdentifier);
        };
        this.onFilesAdded = ({ files }) => {
            this.uploadComponent.emitUploadsStart(files);
        };
        this.onFilePreviewUpdate = ({ file, preview, }) => {
            this.uploadComponent.emitUploadPreviewUpdate(file, preview);
        };
        this.onFileConverting = ({ file }) => {
            this.uploadComponent.emitUploadEnd(file);
        };
        this.onUploadError = ({ fileId, error, }) => {
            this.uploadComponent.emitUploadError(fileId, error);
        };
        const { mediaClient, config, onUploadsStart, onPreviewUpdate, onEnd, onError, } = this.props;
        const tenantUploadParams = config.uploadParams;
        const { shouldCopyFileToRecents = true } = config;
        this.uploadComponent.on('uploads-start', this.fireCommencedEvent);
        this.uploadComponent.on('upload-end', this.fireUploadSucceeded);
        this.uploadComponent.on('upload-error', this.fireUploadFailed);
        if (onUploadsStart) {
            this.uploadComponent.on('uploads-start', onUploadsStart);
        }
        if (onPreviewUpdate) {
            this.uploadComponent.on('upload-preview-update', onPreviewUpdate);
        }
        if (onEnd) {
            this.uploadComponent.on('upload-end', onEnd);
        }
        if (onError) {
            this.uploadComponent.on('upload-error', onError);
        }
        this.uploadService = new UploadServiceImpl(mediaClient, tenantUploadParams, shouldCopyFileToRecents);
        this.uploadService.on('files-added', this.onFilesAdded);
        this.uploadService.on('file-preview-update', this.onFilePreviewUpdate);
        this.uploadService.on('file-converting', this.onFileConverting);
        this.uploadService.on('file-upload-error', this.onUploadError);
    }
    setUploadParams(uploadParams) {
        this.uploadService.setUploadParams(uploadParams);
    }
}
//# sourceMappingURL=localUploadReact.js.map