import React from 'react';
import { BrowserAuthView } from './auth/auth';
import { SpinnerWrapper } from '../styled';
import { FolderViewer } from './folderView';
var isUnauthorized = function (meta) {
    return meta.access === 'unauthorized' && meta.visibility === 'restricted';
};
export var BrowserView = function (_a) {
    var items = _a.items, iconUrl = _a.iconUrl, name = _a.pluginName, onAuthSucceeded = _a.onAuthSucceeded, onAuthFailed = _a.onAuthFailed, onFileClick = _a.onFileClick, onFolderClick = _a.onFolderClick, selectedItems = _a.selectedItems;
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