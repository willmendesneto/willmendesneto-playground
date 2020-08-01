"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var styled_1 = require("./styled");
var extractors_1 = require("../../../extractors");
exports.Folder = function (_a) {
    var folder = _a.folder, icon = _a.icon, onClick = _a.onClick;
    var url = extractors_1.getResourceUrl(folder.url);
    return (react_1.default.createElement(styled_1.FolderViewerRow, { onClick: function () { return url && onClick(url); }, key: url },
        react_1.default.createElement(styled_1.FileMetadataGroup, null,
            react_1.default.createElement(styled_1.FileIcon, null, icon),
            react_1.default.createElement(styled_1.FileName, null, folder.name))));
};
//# sourceMappingURL=folder.js.map