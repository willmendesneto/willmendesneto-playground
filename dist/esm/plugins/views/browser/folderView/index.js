import { __read, __spread } from "tslib";
import React from 'react';
import { FolderViewerContent } from './styled';
import { mapMimeTypeToIcon, folderIcon, } from '../../../../popup/tools/mimeTypeToIcon';
import { getResourceUrl } from '../../../extractors';
import { File } from './file';
import { Folder } from './folder';
export var FolderViewer = function (_a) {
    var data = _a.items.data, selectedItems = _a.selectedItems, onFolderClick = _a.onFolderClick, onFileClick = _a.onFileClick;
    if (!data || data.items.length === 0) {
        return null;
    }
    var items = __spread(data.items);
    return (React.createElement(FolderViewerContent, null, items.map(function (item, index) {
        var icon = mapMimeTypeToIcon(item['schema:fileFormat'] || '');
        var url = getResourceUrl(item.url);
        var selectedIds = selectedItems.map(function (item) { return item.id; });
        var isSelected = url ? selectedIds.indexOf(url) > -1 : false;
        var key = item['@id'] || index;
        if (item['@type'] === 'Collection') {
            return (React.createElement(Folder, { key: key, folder: item, icon: folderIcon, onClick: onFolderClick }));
        }
        else {
            return (React.createElement(File, { key: key, isSelected: isSelected, file: item, icon: icon, onClick: onFileClick }));
        }
    })));
};
//# sourceMappingURL=index.js.map