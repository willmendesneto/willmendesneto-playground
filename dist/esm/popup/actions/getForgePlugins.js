export var GET_FORGE_PLUGINS = 'GET_FORGE_PLUGINS';
export var isGetForgePluginsAction = function (action) {
    return action.type === GET_FORGE_PLUGINS;
};
export var getForgePlugins = function () {
    return {
        type: GET_FORGE_PLUGINS,
    };
};
export var GET_FORGE_PLUGINS_FULLFILLED = 'GET_FORGE_PLUGINS_FULLFILLED';
export var isGetForgePluginsFullfilledAction = function (action) {
    return action.type === GET_FORGE_PLUGINS_FULLFILLED;
};
export function getForgePluginsFullfilled(items) {
    return {
        type: GET_FORGE_PLUGINS_FULLFILLED,
        items: items,
    };
}
export var GET_FORGE_PLUGINS_FAILED = 'GET_FORGE_PLUGINS_FAILED';
export var isGetForgePluginsFailedAction = function (action) {
    return action.type === GET_FORGE_PLUGINS_FAILED;
};
export function getForgePluginsFailed() {
    return {
        type: GET_FORGE_PLUGINS_FAILED,
    };
}
//# sourceMappingURL=getForgePlugins.js.map