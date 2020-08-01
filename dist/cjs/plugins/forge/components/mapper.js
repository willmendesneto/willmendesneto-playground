"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var bricks_1 = require("../../views/bricks");
var browser_1 = require("../../views/browser/browser");
var extractors_1 = require("../../../plugins/extractors");
exports.ForgeViewMapper = function (_a) {
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
            var url = extractors_1.getResourceUrl(item.url) || '';
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
        return react_1.default.createElement(bricks_1.BricksView, tslib_1.__assign({ items: brickItems }, viewProps));
    }
    else if (view === 'folder') {
        return (react_1.default.createElement(browser_1.BrowserView, tslib_1.__assign({ items: items, iconUrl: iconUrl, onAuthSucceeded: onUpdateItems, onAuthFailed: function (err) {
                // eslint-disable-next-line no-console
                return console.error(err);
            } }, viewProps)));
    }
    return null;
};
//# sourceMappingURL=mapper.js.map