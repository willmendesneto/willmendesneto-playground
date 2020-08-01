"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var actions_1 = require("../actions");
var getForgePlugins_1 = require("../actions/getForgePlugins");
var forge_1 = require("../../plugins/forge");
exports.getForgePlugins = function () { return function (store) { return function (next) { return function (action) {
    if (getForgePlugins_1.isGetForgePluginsAction(action)) {
        exports.requestForgePlugins(store);
    }
    return next(action);
}; }; }; };
exports.requestForgePlugins = function (store) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var client, dispatch, providers, availableProviders, pluginsForMediaPicker, e_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new forge_1.ForgeClient();
                dispatch = store.dispatch;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, client.getProviders()];
            case 2:
                providers = (_a.sent()).providers;
                availableProviders = providers.filter(function (provider) { return !!provider.metadata.supportedViews.length; });
                pluginsForMediaPicker = availableProviders
                    .map(exports.transformForgeProviderToPlugin)
                    .sort(function (b, a) { return b.name.localeCompare(a.name); });
                dispatch(actions_1.getForgePluginsFullfilled(pluginsForMediaPicker));
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                dispatch(actions_1.getForgePluginsFailed());
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.transformForgeProviderToPlugin = function (provider) { return ({
    name: provider.metadata.name,
    icon: react_1.default.createElement(forge_1.ForgeIcon, { iconUrl: provider.metadata.avatarUrl }),
    render: function (actions, selectedItems) {
        return (react_1.default.createElement(forge_1.ForgeView, { key: provider.key, actions: actions, selectedItems: selectedItems, extensionOpts: {
                id: provider.key,
                name: provider.metadata.name,
                view: provider.metadata.supportedViews[0],
                iconUrl: provider.metadata.avatarUrl,
            } }));
    },
}); };
//# sourceMappingURL=getForgePlugins.js.map