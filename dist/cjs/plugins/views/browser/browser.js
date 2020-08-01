"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var auth_1 = require("./auth/auth");
var styled_1 = require("../styled");
var folderView_1 = require("./folderView");
var isUnauthorized = function (meta) {
    return meta.access === 'unauthorized' && meta.visibility === 'restricted';
};
exports.BrowserView = function (_a) {
    var items = _a.items, iconUrl = _a.iconUrl, name = _a.pluginName, onAuthSucceeded = _a.onAuthSucceeded, onAuthFailed = _a.onAuthFailed, onFileClick = _a.onFileClick, onFolderClick = _a.onFolderClick, selectedItems = _a.selectedItems;
    if (!items) {
        return react_1.default.createElement(styled_1.SpinnerWrapper, null);
    }
    else if (isUnauthorized(items.meta)) {
        return (react_1.default.createElement(auth_1.BrowserAuthView, { auth: items.meta.auth || [], iconUrl: iconUrl, name: name, onAuthSucceeded: onAuthSucceeded, onAuthFailed: onAuthFailed }));
    }
    else {
        return (react_1.default.createElement(folderView_1.FolderViewer, { selectedItems: selectedItems, items: items, onFolderClick: onFolderClick, onFileClick: onFileClick }));
    }
};
//# sourceMappingURL=browser.js.map