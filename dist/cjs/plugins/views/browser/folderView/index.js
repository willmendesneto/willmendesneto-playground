"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var styled_1 = require("./styled");
var mimeTypeToIcon_1 = require("../../../../popup/tools/mimeTypeToIcon");
var extractors_1 = require("../../../extractors");
var file_1 = require("./file");
var folder_1 = require("./folder");
exports.FolderViewer = function (_a) {
    var data = _a.items.data, selectedItems = _a.selectedItems, onFolderClick = _a.onFolderClick, onFileClick = _a.onFileClick;
    if (!data || data.items.length === 0) {
        return null;
    }
    var items = tslib_1.__spread(data.items);
    return (react_1.default.createElement(styled_1.FolderViewerContent, null, items.map(function (item, index) {
        var icon = mimeTypeToIcon_1.mapMimeTypeToIcon(item['schema:fileFormat'] || '');
        var url = extractors_1.getResourceUrl(item.url);
        var selectedIds = selectedItems.map(function (item) { return item.id; });
        var isSelected = url ? selectedIds.indexOf(url) > -1 : false;
        var key = item['@id'] || index;
        if (item['@type'] === 'Collection') {
            return (react_1.default.createElement(folder_1.Folder, { key: key, folder: item, icon: mimeTypeToIcon_1.folderIcon, onClick: onFolderClick }));
        }
        else {
            return (react_1.default.createElement(file_1.File, { key: key, isSelected: isSelected, file: item, icon: icon, onClick: onFileClick }));
        }
    })));
};
//# sourceMappingURL=index.js.map