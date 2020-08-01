/// <reference types="react-redux" />
import { Component } from 'react';
import { Store } from 'redux';
import { IntlShape } from 'react-intl';
import { MediaClient } from '@atlaskit/media-client';
import { UIAnalyticsEventHandler } from '@atlaskit/analytics-next';
import { ServiceName, State, ServiceFile, SelectedItem } from '../domain';
import { StartAppActionPayload } from '../actions/startApp';
import { UploadsStartEventPayload, UploadErrorEventPayload, UploadParams, PopupConfig } from '../../types';
import { DropzoneDragLeaveEventPayload } from '../../components/types';
import { MediaPickerPlugin } from '../../domain/plugin';
export interface AppStateProps {
    readonly selectedServiceName: ServiceName;
    readonly isVisible: boolean;
    readonly selectedItems: SelectedItem[];
    readonly tenantMediaClient: MediaClient;
    readonly userMediaClient: MediaClient;
    readonly config?: Partial<PopupConfig>;
    readonly plugins?: MediaPickerPlugin[];
}
export interface AppDispatchProps {
    readonly onStartApp: (payload: StartAppActionPayload) => void;
    readonly onClose: () => void;
    readonly onUploadsStart: (payload: UploadsStartEventPayload) => void;
    readonly onUploadError: (payload: UploadErrorEventPayload) => void;
    readonly onDropzoneDragOut: (fileCount: number) => void;
    readonly onDropzoneDropIn: (fileCount: number) => void;
    readonly onFileClick: (serviceFile: ServiceFile, serviceName: ServiceName) => void;
}
export interface AppProxyReactContext {
    getAtlaskitAnalyticsEventHandlers: () => UIAnalyticsEventHandler[];
    getAtlaskitAnalyticsContext?: () => Record<string, any>[];
    intl?: IntlShape;
}
export interface AppOwnProps {
    store: Store<State>;
    tenantUploadParams: UploadParams;
    proxyReactContext?: AppProxyReactContext;
    useForgePlugins?: boolean;
}
export declare type AppProps = AppStateProps & AppOwnProps & AppDispatchProps;
export interface AppState {
    readonly isDropzoneActive: boolean;
}
export declare class App extends Component<AppProps, AppState> {
    private readonly componentMediaClient;
    private browserRef;
    private dropzoneRef;
    private readonly localUploader;
    constructor(props: AppProps);
    onDragLeave: (payload: DropzoneDragLeaveEventPayload) => void;
    onDragEnter: () => void;
    onDrop: (payload: UploadsStartEventPayload) => void;
    render(): JSX.Element;
    private renderCurrentView;
    private setDropzoneActive;
    private renderClipboard;
    private renderBrowser;
    private renderDropzone;
}
declare const _default;
export default _default;
