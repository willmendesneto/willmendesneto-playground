export const GET_FORGE_PLUGINS = 'GET_FORGE_PLUGINS';
export const isGetForgePluginsAction = (action) => {
    return action.type === GET_FORGE_PLUGINS;
};
export const getForgePlugins = () => {
    return {
        type: GET_FORGE_PLUGINS,
    };
};
export const GET_FORGE_PLUGINS_FULLFILLED = 'GET_FORGE_PLUGINS_FULLFILLED';
export const isGetForgePluginsFullfilledAction = (action) => {
    return action.type === GET_FORGE_PLUGINS_FULLFILLED;
};
export function getForgePluginsFullfilled(items) {
    return {
        type: GET_FORGE_PLUGINS_FULLFILLED,
        items,
    };
}
export const GET_FORGE_PLUGINS_FAILED = 'GET_FORGE_PLUGINS_FAILED';
export const isGetForgePluginsFailedAction = (action) => {
    return action.type === GET_FORGE_PLUGINS_FAILED;
};
export function getForgePluginsFailed() {
    return {
        type: GET_FORGE_PLUGINS_FAILED,
    };
}
//# sourceMappingURL=getForgePlugins.js.map