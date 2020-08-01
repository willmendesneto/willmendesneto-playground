import { __awaiter, __generator } from "tslib";
import React from 'react';
import { getForgePluginsFullfilled, getForgePluginsFailed } from '../actions';
import { isGetForgePluginsAction } from '../actions/getForgePlugins';
import { ForgeView, ForgeIcon, ForgeClient, } from '../../plugins/forge';
export var getForgePlugins = function () { return function (store) { return function (next) { return function (action) {
    if (isGetForgePluginsAction(action)) {
        requestForgePlugins(store);
    }
    return next(action);
}; }; }; };
export var requestForgePlugins = function (store) { return __awaiter(void 0, void 0, void 0, function () {
    var client, dispatch, providers, availableProviders, pluginsForMediaPicker, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new ForgeClient();
                dispatch = store.dispatch;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, client.getProviders()];
            case 2:
                providers = (_a.sent()).providers;
                availableProviders = providers.filter(function (provider) { return !!provider.metadata.supportedViews.length; });
                pluginsForMediaPicker = availableProviders
                    .map(transformForgeProviderToPlugin)
                    .sort(function (b, a) { return b.name.localeCompare(a.name); });
                dispatch(getForgePluginsFullfilled(pluginsForMediaPicker));
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                dispatch(getForgePluginsFailed());
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var transformForgeProviderToPlugin = function (provider) { return ({
    name: provider.metadata.name,
    icon: React.createElement(ForgeIcon, { iconUrl: provider.metadata.avatarUrl }),
    render: function (actions, selectedItems) {
        return (React.createElement(ForgeView, { key: provider.key, actions: actions, selectedItems: selectedItems, extensionOpts: {
                id: provider.key,
                name: provider.metadata.name,
                view: provider.metadata.supportedViews[0],
                iconUrl: provider.metadata.avatarUrl,
            } }));
    },
}); };
//# sourceMappingURL=getForgePlugins.js.map