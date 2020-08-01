"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_FORGE_PLUGINS = 'GET_FORGE_PLUGINS';
exports.isGetForgePluginsAction = function (action) {
    return action.type === exports.GET_FORGE_PLUGINS;
};
exports.getForgePlugins = function () {
    return {
        type: exports.GET_FORGE_PLUGINS,
    };
};
exports.GET_FORGE_PLUGINS_FULLFILLED = 'GET_FORGE_PLUGINS_FULLFILLED';
exports.isGetForgePluginsFullfilledAction = function (action) {
    return action.type === exports.GET_FORGE_PLUGINS_FULLFILLED;
};
function getForgePluginsFullfilled(items) {
    return {
        type: exports.GET_FORGE_PLUGINS_FULLFILLED,
        items: items,
    };
}
exports.getForgePluginsFullfilled = getForgePluginsFullfilled;
exports.GET_FORGE_PLUGINS_FAILED = 'GET_FORGE_PLUGINS_FAILED';
exports.isGetForgePluginsFailedAction = function (action) {
    return action.type === exports.GET_FORGE_PLUGINS_FAILED;
};
function getForgePluginsFailed() {
    return {
        type: exports.GET_FORGE_PLUGINS_FAILED,
    };
}
exports.getForgePluginsFailed = getForgePluginsFailed;
//# sourceMappingURL=getForgePlugins.js.map