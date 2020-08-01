import { Action } from 'redux';
export declare const DESELECT_ITEM = "DESELECT_ITEM";
export interface DeselectItemAction extends Action {
    readonly type: 'DESELECT_ITEM';
    readonly id: string;
}
export declare function isDeselectItemAction(action: Action): action is DeselectItemAction;
export declare function deselectItem(fileId: string): DeselectItemAction;
