import React from 'react';
import { FolderViewerRow, FileMetadataGroup, FileIcon, FileName, } from './styled';
import { getResourceUrl } from '../../../extractors';
export var Folder = function (_a) {
    var folder = _a.folder, icon = _a.icon, onClick = _a.onClick;
    var url = getResourceUrl(folder.url);
    return (React.createElement(FolderViewerRow, { onClick: function () { return url && onClick(url); }, key: url },
        React.createElement(FileMetadataGroup, null,
            React.createElement(FileIcon, null, icon),
            React.createElement(FileName, null, folder.name))));
};
//# sourceMappingURL=folder.js.map