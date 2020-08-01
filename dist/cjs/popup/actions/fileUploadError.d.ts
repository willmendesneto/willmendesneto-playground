import { Action } from 'redux';
import { MediaError } from '../../types';
import { UploadErrorEvent } from '../../domain/uploadEvent';
import { UploadErrorEventPayload } from '../../types';
export declare const FILE_UPLOAD_ERROR = "FILE_UPLOAD_ERROR";
export interface FileUploadErrorAction extends Action {
    readonly type: 'FILE_UPLOAD_ERROR';
    readonly fileId: string;
    readonly error: MediaError;
    readonly originalEvent: UploadErrorEvent;
}
export declare function isFileUploadErrorAction(action: Action): action is FileUploadErrorAction;
export declare function fileUploadError(payload: UploadErrorEventPayload): FileUploadErrorAction;
