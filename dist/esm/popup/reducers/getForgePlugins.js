import { __assign } from "tslib";
import { isGetForgePluginsFullfilledAction, isGetForgePluginsFailedAction, } from '../actions/getForgePlugins';
export var getForgePluginsStarted = function (state, action) {
    return state;
};
export var getForgePluginsFullfilled = function (state, action) {
    if (isGetForgePluginsFullfilledAction(action)) {
        var items = action.items;
        return __assign(__assign({}, state), { plugins: mergePlugins(state.plugins, items) });
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
export var getForgePluginsFailed = function (state, action) {
    if (isGetForgePluginsFailedAction(action)) {
        return __assign(__assign({}, state), { view: __assign(__assign({}, state.view), { hasError: true, isLoading: false }) });
    }
    return state;
};
//# sourceMappingURL=getForgePlugins.js.map