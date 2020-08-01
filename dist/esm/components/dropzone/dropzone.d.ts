/// <reference types="react" />
/// <reference types="@emotion/core" />
import { LocalUploadComponentReact, LocalUploadComponentBaseProps } from '../localUploadReact';
import { DropzoneConfig } from '../../types';
import { DropzoneDragEnterEventPayload, DropzoneDragLeaveEventPayload, DropzoneUploadEventPayloadMap } from '../types';
export declare type DropzoneProps = LocalUploadComponentBaseProps & {
    config: DropzoneConfig;
    onDrop?: () => void;
    onDragEnter?: (payload: DropzoneDragEnterEventPayload) => void;
    onDragLeave?: (payload: DropzoneDragLeaveEventPayload) => void;
    onCancelFn?: (cancel: (uniqueIdentifier: string) => void) => void;
};
export declare class DropzoneBase extends LocalUploadComponentReact<DropzoneProps, DropzoneUploadEventPayloadMap> {
    private uiActive;
    constructor(props: DropzoneProps);
    private getContainer;
    componentDidMount(): void;
    componentWillUnmount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: DropzoneProps): void;
    private addContainerListeners;
    private removeContainerListeners;
    private onDragOver;
    private onDragLeave;
    private readonly onFileDropped;
    private getDraggedItemsLength;
    private onDrop;
    private emitDragOver;
    private emitDragLeave;
    private fireAnalyticsEvent;
    render(): null;
}
export declare const Dropzone: import("react").ForwardRefExoticComponent<Pick<Pick<DropzoneProps, "onError" | "onDragEnter" | "onDragLeave" | "onDrop" | "mediaClient" | "config" | "onUploadsStart" | "onPreviewUpdate" | "onEnd" | "onCancelFn"> & import("react").RefAttributes<any> & import("@atlaskit/analytics-next/dist/cjs/withAnalyticsContext").WithContextProps, "key" | "onError" | "onDragEnter" | "onDragLeave" | "onDrop" | "analyticsContext" | "mediaClient" | "config" | "onUploadsStart" | "onPreviewUpdate" | "onEnd" | "onCancelFn"> & import("react").RefAttributes<any>>;
