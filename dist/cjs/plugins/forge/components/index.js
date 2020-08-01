"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("react");
var debounce = tslib_1.__importStar(require("lodash.debounce"));
var types_1 = require("../types");
var client_1 = require("../client");
var mapper_1 = require("./mapper");
var header_1 = require("./header");
var styled_1 = require("./styled");
var loading_1 = require("./loading");
var error_1 = require("./error");
var utils_1 = require("../utils");
exports.ForgeView = function (_a) {
    var _b = _a.extensionOpts, name = _b.name, id = _b.id, view = _b.view, iconUrl = _b.iconUrl, actions = _a.actions, selectedItems = _a.selectedItems;
    var client = react_2.useMemo(function () { return new client_1.ForgeClient(); }, []);
    var _c = tslib_1.__read(react_2.useState(true), 2), loading = _c[0], setLoading = _c[1];
    var _d = tslib_1.__read(react_2.useState(''), 2), contextId = _d[0], setContextId = _d[1];
    var _e = tslib_1.__read(react_2.useState(), 2), query = _e[0], setQuery = _e[1];
    var _f = tslib_1.__read(react_2.useState(), 2), error = _f[0], setError = _f[1];
    var _g = tslib_1.__read(react_2.useState(types_1.JsonLdCollectionEmpty), 2), items = _g[0], setItems = _g[1];
    var onUpdateItems = react_2.useCallback(debounce(function (query, folderId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var newItems, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setError(undefined);
                    setLoading(true);
                    return [4 /*yield*/, client.invokeProvider(id, {
                            query: query,
                            folderId: folderId || contextId,
                        })];
                case 1:
                    newItems = _a.sent();
                    setItems(newItems);
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _a.sent();
                    setError(err_1);
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, 1000), [name, contextId]);
    var onQueryChange = react_2.useCallback(function (event) {
        setQuery(event.currentTarget.value);
        onUpdateItems(query);
    }, [onUpdateItems, query]);
    var onClick = react_2.useCallback(function (id) { return function () {
        var resource = items.data && tslib_1.__spread(items.data.items).find(function (item) { return item.url === id; });
        if (resource) {
            if (resource['@type'] === 'Collection') {
                var id_1 = resource['@id'] || '';
                setContextId(id_1);
                onUpdateItems(query, id_1);
            }
            else {
                var metadata = utils_1.getMetadata(id, resource);
                actions.fileClick(metadata, name);
            }
        }
    }; }, [items.data, onUpdateItems, query, actions, name]);
    var onFileClick = react_2.useCallback(function (id) { return onClick(id)(); }, [onClick]);
    react_2.useEffect(function () {
        onUpdateItems(query);
    }, [onUpdateItems, query, id]);
    return (react_1.default.createElement(styled_1.PluginWrapper, null,
        react_1.default.createElement(header_1.PluginHeader, { name: name, loading: loading, error: error, totalImages: items.data && items.data.items && tslib_1.__spread(items.data.items).length, onQueryChange: onQueryChange, query: query }),
        loading ? (react_1.default.createElement(loading_1.PluginLoadingView, null)) : error ? (react_1.default.createElement(error_1.PluginErrorView, { error: error, onRetry: onUpdateItems })) : (react_1.default.createElement(styled_1.PluginContentContainer, null,
            react_1.default.createElement(mapper_1.ForgeViewMapper, { view: view, items: items, iconUrl: iconUrl, selectedItems: selectedItems, onUpdateItems: onUpdateItems, onFileClick: onFileClick, onFolderClick: onFileClick, name: name })))));
};
var icon_1 = require("./icon");
exports.ForgeIcon = icon_1.ForgeIcon;
//# sourceMappingURL=index.js.map