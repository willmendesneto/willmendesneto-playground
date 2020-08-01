import React from 'react';
import { BrowserAuthView } from './auth/auth';
import { SpinnerWrapper } from '../styled';
import { FolderViewer } from './folderView';
const isUnauthorized = (meta) => meta.access === 'unauthorized' && meta.visibility === 'restricted';
export const BrowserView = ({ items, iconUrl, pluginName: name, onAuthSucceeded, onAuthFailed, onFileClick, onFolderClick, selectedItems, }) => {
    if (!items) {
        return React.createElement(SpinnerWrapper, null);
    }
    else if (isUnauthorized(items.meta)) {
        return (React.createElement(BrowserAuthView, { auth: items.meta.auth || [], iconUrl: iconUrl, name: name, onAuthSucceeded: onAuthSucceeded, onAuthFailed: onAuthFailed }));
    }
    else {
        return (React.createElement(FolderViewer, { selectedItems: selectedItems, items: items, onFolderClick: onFolderClick, onFileClick: onFileClick }));
    }
};
//# sourceMappingURL=browser.js.map