import { MediaClient } from '@atlaskit/media-client';
import { UploadComponent } from './component';
import { UploadParams, PopupUploadEventPayloadMap, Popup, PopupConfig } from '../types';
import { PopupUploadEventEmitter } from './types';
export declare class PopupImpl extends UploadComponent<PopupUploadEventPayloadMap> implements PopupUploadEventEmitter, Popup {
    readonly tenantMediaClient: MediaClient;
    private readonly container?;
    private readonly store;
    private tenantUploadParams;
    private proxyReactContext?;
    private useForgePlugins?;
    constructor(tenantMediaClient: MediaClient, { container, uploadParams, // tenant
    proxyReactContext, singleSelect, plugins, useForgePlugins, }: PopupConfig);
    show(): Promise<void>;
    cancel(uniqueIdentifier?: string | Promise<string>): Promise<void>;
    teardown(): void;
    hide(): void;
    setUploadParams(uploadParams: UploadParams): void;
    emitClosed(): void;
    private renderPopup;
}
