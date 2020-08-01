import { __assign } from "tslib";
import React from 'react';
import { BricksView } from '../../views/bricks';
import { BrowserView } from '../../views/browser/browser';
import { getResourceUrl } from '../../../plugins/extractors';
export var ForgeViewMapper = function (_a) {
    var view = _a.view, items = _a.items, iconUrl = _a.iconUrl, onUpdateItems = _a.onUpdateItems, selectedItems = _a.selectedItems, onFileClick = _a.onFileClick, name = _a.name;
    var viewProps = {
        selectedItems: selectedItems,
        onFileClick: onFileClick,
        onFolderClick: onFileClick,
        pluginName: name,
    };
    if (view === 'bricks') {
        if (!items.data) {
            return null;
        }
        var brickItems = items.data.items.map(function (item) {
            var url = getResourceUrl(item.url) || '';
            var src = (item.image &&
                typeof item.image !== 'string' &&
                item.image['@type'] === 'Link' &&
                item.image.href) ||
                '';
            var width = (item.image &&
                typeof item.image !== 'string' &&
                item.image['@type'] === 'Link' &&
                item.image.width) ||
                0;
            var height = (item.image &&
                typeof item.image !== 'string' &&
                item.image['@type'] === 'Link' &&
                item.image.height) ||
                0;
            return {
                id: url,
                dimensions: { width: width, height: height },
                dataURI: src,
                name: name,
            };
        });
        return React.createElement(BricksView, __assign({ items: brickItems }, viewProps));
    }
    else if (view === 'folder') {
        return (React.createElement(BrowserView, __assign({ items: items, iconUrl: iconUrl, onAuthSucceeded: onUpdateItems, onAuthFailed: function (err) {
                // eslint-disable-next-line no-console
                return console.error(err);
            } }, viewProps)));
    }
    return null;
};
//# sourceMappingURL=mapper.js.map