import { MediaClient, MediaCollectionItem } from '@atlaskit/media-client';
import { Subscription } from 'rxjs/Subscription';
import { LocalUploads } from './local-upload';
export { AuthHeaders } from './auth';
export { SourceFile, SourceFileOwner, ClientBasedSourceFileOwner, AsapBasedSourceFileOwner, } from './source-file';
export { LocalUpload, LocalUploads, LocalUploadFile, LocalUploadFileMetadata, } from './local-upload';
import { ImageCardModel } from '../tools/fetcher/fetcher';
import { MediaPickerPlugin } from '../../domain/plugin';
import { PopupConfig } from '../../types';
export interface State {
    readonly redirectUrl: string;
    readonly view: View;
    readonly accounts: Promise<ServiceAccountWithType[]>;
    readonly editorData?: EditorData;
    readonly recents: Recents;
    readonly selectedItems: SelectedItem[];
    readonly uploads: LocalUploads;
    readonly remoteUploads: RemoteUploads;
    readonly isCancelling: boolean;
    readonly isUploading: boolean;
    readonly tenantMediaClient: MediaClient;
    readonly userMediaClient: MediaClient;
    readonly lastUploadIndex: number;
    readonly giphy: GiphyState;
    readonly collectionItemsSubscription?: Subscription;
    readonly onCancelUpload: CancelUploadHandler;
    readonly config: Partial<PopupConfig>;
    readonly plugins?: MediaPickerPlugin[];
}
export declare type CancelUploadHandler = (uniqueIdentifier: string) => void;
export interface GiphyState {
    readonly imageCardModels: ImageCardModel[];
    readonly totalResultCount?: number;
}
export interface Recents {
    readonly items: MediaCollectionItem[];
}
export declare type RemoteUpload = {
    readonly timeStarted: number;
};
export declare type RemoteUploads = {
    [tenantFileId: string]: RemoteUpload;
};
export interface View {
    readonly isVisible: boolean;
    readonly items: ServiceFolderItem[];
    readonly isLoading: boolean;
    readonly hasError: boolean;
    readonly path: Path;
    readonly service: ServiceAccountLink;
    readonly isUploading: boolean;
    readonly isCancelling: boolean;
    readonly currentCursor?: string;
    readonly nextCursor?: string;
}
export interface EditorData {
    readonly imageUrl?: string;
    readonly originalFile?: FileReference;
    readonly error?: EditorError;
}
export interface EditorError {
    readonly message: string;
    readonly retryHandler?: () => void;
}
export declare type ServiceName = 'recent_files' | 'google' | 'dropbox' | 'upload' | 'giphy' | string;
export declare const isRemoteCloudAccount: (serviceName: string) => boolean;
export declare type ServiceStatus = 'forbidden' | 'scope_unsupported' | 'scope_insufficient' | 'expired' | 'refresh_needed' | 'available';
export interface Service {
    readonly type: ServiceName;
    readonly status: ServiceStatus;
    readonly accounts: ServiceAccount[];
}
export interface ServiceAccount {
    readonly id: string;
    readonly displayName: string;
    readonly status: ServiceStatus;
}
export interface ServiceAccountLink {
    readonly accountId: string;
    readonly name: ServiceName;
}
export interface ServiceAccountWithType extends ServiceAccount {
    readonly type: ServiceName;
}
export interface ServiceFolder {
    readonly mimeType: 'application/vnd.atlassian.mediapicker.folder';
    readonly id: string;
    readonly name: string;
    readonly parentId: string;
    readonly items: ServiceFolderItem[];
    readonly cursor?: string;
}
export interface ServiceFile {
    readonly mimeType: string;
    readonly id: string;
    readonly name: string;
    readonly size: number;
    readonly date: number;
    readonly occurrenceKey?: string;
    readonly metadata?: any;
    readonly createdAt?: number;
}
export interface SelectedItem extends ServiceFile {
    readonly serviceName: ServiceName;
    readonly accountId?: string;
}
export declare type ServiceFolderItem = ServiceFolder | ServiceFile;
export declare const isServiceFolder: (item: ServiceFolderItem) => item is ServiceFolder;
export declare const isServiceFile: (item: ServiceFolderItem) => item is ServiceFile;
export interface FolderReference {
    readonly id: string;
    readonly name: string;
}
export declare type Path = Array<FolderReference>;
export interface FileReference {
    readonly id: string;
    readonly name: string;
}
