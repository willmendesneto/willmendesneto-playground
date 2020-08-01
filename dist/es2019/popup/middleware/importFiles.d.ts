import { Store, Middleware } from 'redux';
import { TouchFileDescriptor, FileState } from '@atlaskit/media-client';
import { State, SelectedItem, ServiceName } from '../domain';
import { WsProvider } from '../tools/websocket/wsProvider';
import { MediaFile } from '../../types';
import { PopupUploadEventEmitter } from '../../components/types';
export interface RemoteFileItem extends SelectedItem {
    accountId: string;
    publicId: string;
}
export declare const isRemoteFileItem: (item: SelectedItem) => item is RemoteFileItem;
export declare const isRemoteService: (serviceName: string) => boolean;
export declare type SelectedUploadFile = {
    readonly file: MediaFile;
    readonly serviceName: ServiceName;
    readonly touchFileDescriptor: TouchFileDescriptor;
    readonly accountId?: string;
};
export declare function importFilesMiddleware(eventEmitter: PopupUploadEventEmitter, wsProvider: WsProvider): Middleware;
/**
 * Take selected file (that can be local uploads, recents or remote file (giphy, google, dropbox))
 * and convert it to FileState that will become tenant file state.
 * If selected file already in the cache (for local uploads and recents) we take everything it has, change it's id
 * to new tenant id (generated on client side) and add a preview.
 * If selected file is not in the cache (for remote selected files) we generate new file state
 * with details found in selected file.
 */
export declare const getTenantFileState: (store: Store<State>, selectedUploadFile: SelectedUploadFile) => Promise<FileState>;
/**
 * We call `/upload/createWithFiles` (touch) endpoint to create an empty file with client side
 * generated file ID that we use here as tenant file id.
 */
export declare const touchSelectedFile: (touchFileDescriptor: TouchFileDescriptor, store: Store<State>) => Promise<import("@atlaskit/media-client").TouchedFiles>;
export declare function importFiles(eventEmitter: PopupUploadEventEmitter, store: Store<State>, wsProvider: WsProvider): Promise<void>;
