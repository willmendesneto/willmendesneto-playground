import { Action } from 'redux';
import { MediaPickerPlugin } from '../../domain/plugin';
export declare const GET_FORGE_PLUGINS = "GET_FORGE_PLUGINS";
export interface GetForgePluginsAction extends Action {
    type: 'GET_FORGE_PLUGINS';
}
export declare const isGetForgePluginsAction: (action: Action) => action is GetForgePluginsAction;
export declare const getForgePlugins: () => GetForgePluginsAction;
export declare const GET_FORGE_PLUGINS_FULLFILLED = "GET_FORGE_PLUGINS_FULLFILLED";
export interface GetForgePluginsFullfilledAction {
    readonly type: 'GET_FORGE_PLUGINS_FULLFILLED';
    readonly items: MediaPickerPlugin[];
}
export declare const isGetForgePluginsFullfilledAction: (action: Action) => action is GetForgePluginsFullfilledAction;
export declare function getForgePluginsFullfilled(items: MediaPickerPlugin[]): GetForgePluginsFullfilledAction;
export declare const GET_FORGE_PLUGINS_FAILED = "GET_FORGE_PLUGINS_FAILED";
export interface GetForgePluginsFailedAction {
    readonly type: 'GET_FORGE_PLUGINS_FAILED';
}
export declare const isGetForgePluginsFailedAction: (action: Action) => action is GetForgePluginsFailedAction;
export declare function getForgePluginsFailed(): GetForgePluginsFailedAction;
