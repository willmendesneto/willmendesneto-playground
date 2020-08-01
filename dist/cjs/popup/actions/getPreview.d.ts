import { Action } from 'redux';
import { MediaFile } from '../../types';
export declare const GET_PREVIEW = "GET_PREVIEW";
export declare type GetPreviewAction = {
    readonly type: typeof GET_PREVIEW;
    readonly fileId: string;
    readonly file: MediaFile;
    readonly collection: string;
};
export declare function isGetPreviewAction(action: Action): action is GetPreviewAction;
export declare function getPreview(tenantFileId: string, file: MediaFile, collection: string): GetPreviewAction;
