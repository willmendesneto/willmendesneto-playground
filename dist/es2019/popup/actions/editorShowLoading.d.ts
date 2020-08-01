import { FileReference } from '../domain';
import { Action } from 'redux';
export declare const EDITOR_SHOW_LOADING = "EDITOR_SHOW_LOADING";
export interface EditorShowLoadingAction extends Action {
    readonly type: 'EDITOR_SHOW_LOADING';
    readonly originalFile: FileReference;
}
export declare function editorShowLoading(originalFile: FileReference): EditorShowLoadingAction;
