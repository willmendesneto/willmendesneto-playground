"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var getForgePlugins_1 = require("../actions/getForgePlugins");
exports.getForgePluginsStarted = function (state, action) {
    return state;
};
exports.getForgePluginsFullfilled = function (state, action) {
    if (getForgePlugins_1.isGetForgePluginsFullfilledAction(action)) {
        var items = action.items;
        return tslib_1.__assign(tslib_1.__assign({}, state), { plugins: mergePlugins(state.plugins, items) });
    }
    return state;
};
var mergePlugins = function (currentPlugins, incomingPlugins) {
    if (currentPlugins && currentPlugins.length > 0) {
        var newPlugins = incomingPlugins.filter(function (incomingPlugin) {
            return !currentPlugins.some(function (currentPlugin) { return currentPlugin.name === incomingPlugin.name; });
        });
        return currentPlugins.concat(newPlugins);
    }
    else {
        return incomingPlugins;
    }
};
exports.getForgePluginsFailed = function (state, action) {
    if (getForgePlugins_1.isGetForgePluginsFailedAction(action)) {
        return tslib_1.__assign(tslib_1.__assign({}, state), { view: tslib_1.__assign(tslib_1.__assign({}, state.view), { hasError: true, isLoading: false }) });
    }
    return state;
};
//# sourceMappingURL=getForgePlugins.js.map