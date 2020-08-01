import { MediaFile, Preview, MediaError, UploadEventPayloadMap } from '../types';
import { GenericEventEmitter } from '../util/eventEmitter';
import { SelectedItem } from '../popup/domain';
export interface UploadEventEmitter {
    emitPluginItemsInserted(selectedPluginItems: SelectedItem[]): void;
    emitUploadsStart(files: MediaFile[]): void;
    emitUploadPreviewUpdate(file: MediaFile, preview: Preview): void;
    emitUploadEnd(file: MediaFile): void;
    emitUploadError(fileId: string, error: MediaError): void;
}
export declare class UploadComponent<M extends UploadEventPayloadMap> extends GenericEventEmitter<M> implements UploadEventEmitter {
    emitPluginItemsInserted(selectedPluginItems: SelectedItem[]): void;
    emitUploadsStart(files: MediaFile[]): void;
    emitUploadPreviewUpdate(file: MediaFile, preview: Preview): void;
    emitUploadEnd(file: MediaFile): void;
    emitUploadError(fileId: string, error: MediaError): void;
}
