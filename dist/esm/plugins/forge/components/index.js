import { __awaiter, __generator, __read, __spread } from "tslib";
import React from 'react';
import { useEffect, useState, useMemo, useCallback } from 'react';
import * as debounce from 'lodash.debounce';
import { JsonLdCollectionEmpty } from '../types';
import { ForgeClient } from '../client';
import { ForgeViewMapper } from './mapper';
import { PluginHeader } from './header';
import { PluginWrapper, PluginContentContainer as PluginContentView, } from './styled';
import { PluginLoadingView } from './loading';
import { PluginErrorView } from './error';
import { getMetadata } from '../utils';
export var ForgeView = function (_a) {
    var _b = _a.extensionOpts, name = _b.name, id = _b.id, view = _b.view, iconUrl = _b.iconUrl, actions = _a.actions, selectedItems = _a.selectedItems;
    var client = useMemo(function () { return new ForgeClient(); }, []);
    var _c = __read(useState(true), 2), loading = _c[0], setLoading = _c[1];
    var _d = __read(useState(''), 2), contextId = _d[0], setContextId = _d[1];
    var _e = __read(useState(), 2), query = _e[0], setQuery = _e[1];
    var _f = __read(useState(), 2), error = _f[0], setError = _f[1];
    var _g = __read(useState(JsonLdCollectionEmpty), 2), items = _g[0], setItems = _g[1];
    var onUpdateItems = useCallback(debounce(function (query, folderId) { return __awaiter(void 0, void 0, void 0, function () {
        var newItems, err_1;
        return __generator(this, function (_a) {
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
    var onQueryChange = useCallback(function (event) {
        setQuery(event.currentTarget.value);
        onUpdateItems(query);
    }, [onUpdateItems, query]);
    var onClick = useCallback(function (id) { return function () {
        var resource = items.data && __spread(items.data.items).find(function (item) { return item.url === id; });
        if (resource) {
            if (resource['@type'] === 'Collection') {
                var id_1 = resource['@id'] || '';
                setContextId(id_1);
                onUpdateItems(query, id_1);
            }
            else {
                var metadata = getMetadata(id, resource);
                actions.fileClick(metadata, name);
            }
        }
    }; }, [items.data, onUpdateItems, query, actions, name]);
    var onFileClick = useCallback(function (id) { return onClick(id)(); }, [onClick]);
    useEffect(function () {
        onUpdateItems(query);
    }, [onUpdateItems, query, id]);
    return (React.createElement(PluginWrapper, null,
        React.createElement(PluginHeader, { name: name, loading: loading, error: error, totalImages: items.data && items.data.items && __spread(items.data.items).length, onQueryChange: onQueryChange, query: query }),
        loading ? (React.createElement(PluginLoadingView, null)) : error ? (React.createElement(PluginErrorView, { error: error, onRetry: onUpdateItems })) : (React.createElement(PluginContentView, null,
            React.createElement(ForgeViewMapper, { view: view, items: items, iconUrl: iconUrl, selectedItems: selectedItems, onUpdateItems: onUpdateItems, onFileClick: onFileClick, onFolderClick: onFileClick, name: name })))));
};
export { ForgeIcon } from './icon';
//# sourceMappingURL=index.js.map