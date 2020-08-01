import React from 'react';
import { FolderViewerContent } from './styled';
import { mapMimeTypeToIcon, folderIcon, } from '../../../../popup/tools/mimeTypeToIcon';
import { getResourceUrl } from '../../../extractors';
import { File } from './file';
import { Folder } from './folder';
export const FolderViewer = ({ items: { data }, selectedItems, onFolderClick, onFileClick, }) => {
    if (!data || data.items.length === 0) {
        return null;
    }
    const items = [...data.items];
    return (React.createElement(FolderViewerContent, null, items.map((item, index) => {
        const icon = mapMimeTypeToIcon(item['schema:fileFormat'] || '');
        const url = getResourceUrl(item.url);
        const selectedIds = selectedItems.map(item => item.id);
        const isSelected = url ? selectedIds.indexOf(url) > -1 : false;
        const key = item['@id'] || index;
        if (item['@type'] === 'Collection') {
            return (React.createElement(Folder, { key: key, folder: item, icon: folderIcon, onClick: onFolderClick }));
        }
        else {
            return (React.createElement(File, { key: key, isSelected: isSelected, file: item, icon: icon, onClick: onFileClick }));
        }
    })));
};
//# sourceMappingURL=index.js.map