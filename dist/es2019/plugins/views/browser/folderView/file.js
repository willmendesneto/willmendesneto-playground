import React from 'react';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import filesize from 'filesize';
import { FolderViewerRow, FileMetadataGroup, FileIcon, FileName, FileCreateDate, FileSize, SelectedFileIconWrapper, } from './styled';
import { getResourceUrl, getDateString } from '../../../extractors';
export const fileSelected = (React.createElement(SelectedFileIconWrapper, null,
    React.createElement(CheckCircleIcon, { label: "check" })));
export const File = ({ isSelected, file, icon, onClick }) => {
    const url = getResourceUrl(file.url);
    const dateCreated = file['schema:dateCreated'];
    const fileSize = file['atlassian:fileSize'] && filesize(file['atlassian:fileSize']);
    return (React.createElement(FolderViewerRow, { isSelected: isSelected, onClick: () => {
            url && onClick(url);
        }, key: url },
        React.createElement(FileMetadataGroup, null,
            React.createElement(FileIcon, null, icon),
            React.createElement(FileName, { isSelected: isSelected }, file.name)),
        isSelected ? (fileSelected) : (React.createElement(FileMetadataGroup, null,
            React.createElement(FileCreateDate, null, getDateString(dateCreated)),
            React.createElement(FileSize, null, fileSize)))));
};
//# sourceMappingURL=file.js.map