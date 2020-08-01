"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var check_circle_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/check-circle"));
var filesize_1 = tslib_1.__importDefault(require("filesize"));
var styled_1 = require("./styled");
var extractors_1 = require("../../../extractors");
exports.fileSelected = (react_1.default.createElement(styled_1.SelectedFileIconWrapper, null,
    react_1.default.createElement(check_circle_1.default, { label: "check" })));
exports.File = function (_a) {
    var isSelected = _a.isSelected, file = _a.file, icon = _a.icon, onClick = _a.onClick;
    var url = extractors_1.getResourceUrl(file.url);
    var dateCreated = file['schema:dateCreated'];
    var fileSize = file['atlassian:fileSize'] && filesize_1.default(file['atlassian:fileSize']);
    return (react_1.default.createElement(styled_1.FolderViewerRow, { isSelected: isSelected, onClick: function () {
            url && onClick(url);
        }, key: url },
        react_1.default.createElement(styled_1.FileMetadataGroup, null,
            react_1.default.createElement(styled_1.FileIcon, null, icon),
            react_1.default.createElement(styled_1.FileName, { isSelected: isSelected }, file.name)),
        isSelected ? (exports.fileSelected) : (react_1.default.createElement(styled_1.FileMetadataGroup, null,
            react_1.default.createElement(styled_1.FileCreateDate, null, extractors_1.getDateString(dateCreated)),
            react_1.default.createElement(styled_1.FileSize, null, fileSize)))));
};
//# sourceMappingURL=file.js.map