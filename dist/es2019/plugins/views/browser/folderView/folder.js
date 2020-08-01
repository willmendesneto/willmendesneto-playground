import React from 'react';
import { FolderViewerRow, FileMetadataGroup, FileIcon, FileName, } from './styled';
import { getResourceUrl } from '../../../extractors';
export const Folder = ({ folder, icon, onClick }) => {
    const url = getResourceUrl(folder.url);
    return (React.createElement(FolderViewerRow, { onClick: () => url && onClick(url), key: url },
        React.createElement(FileMetadataGroup, null,
            React.createElement(FileIcon, null, icon),
            React.createElement(FileName, null, folder.name))));
};
//# sourceMappingURL=folder.js.map