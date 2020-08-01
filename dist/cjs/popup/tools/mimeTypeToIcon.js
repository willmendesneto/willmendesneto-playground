"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var folder_filled_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/folder-filled"));
var image_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/media-services/image"));
var video_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/media-services/video"));
var audio_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/media-services/audio"));
var spreadsheet_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/media-services/spreadsheet"));
var presentation_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/media-services/presentation"));
var document_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/media-services/document"));
var pdf_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/media-services/pdf"));
var zip_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/media-services/zip"));
var unknown_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/media-services/unknown"));
var colors = tslib_1.__importStar(require("@atlaskit/theme/colors"));
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var IconWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), function (_a) {
    var color = _a.color;
    return "color: " + color + ";";
});
function isFolder(mimeType) {
    return ([
        'application/vnd.atlassian.mediapicker.folder',
        'application/vnd.google-apps.folder',
    ].indexOf(mimeType) > -1);
}
function isImage(mimeType) {
    return mimeType.indexOf('image/') === 0;
}
function isVideo(mimeType) {
    return mimeType.indexOf('video/') === 0;
}
function isAudio(mimeType) {
    return mimeType.indexOf('audio/') === 0;
}
function isPDF(mimeType) {
    return mimeType === 'application/pdf';
}
function isSpreadsheet(mimeType) {
    return ([
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/vnd.google-apps.spreadsheet',
        'application/x-iwork-keynote-sffnumbers',
    ].indexOf(mimeType) > -1);
}
function isPresentation(mimeType) {
    return ([
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-powerpoint',
        'application/vnd.google-apps.presentation',
        'application/x-iwork-keynote-sffkey',
    ].indexOf(mimeType) > -1);
}
function isDocument(mimeType) {
    return ([
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'application/x-iwork-pages-sffpages',
    ].indexOf(mimeType) > -1);
}
function isArchive(mimeType) {
    return ([
        'application/zip',
        'application/x-7z-compressed',
        'application/x-bzip',
        'application/x-bzip2',
    ].indexOf(mimeType) > -1);
}
exports.folderIcon = (react_1.default.createElement(IconWrapper, { color: colors.B75 },
    react_1.default.createElement(folder_filled_1.default, { label: "folder" })));
exports.mapMimeTypeToIcon = function (mimeType) {
    if (isFolder(mimeType)) {
        return exports.folderIcon;
    }
    else if (isImage(mimeType)) {
        return (react_1.default.createElement(IconWrapper, { color: colors.Y200 },
            react_1.default.createElement(image_1.default, { label: "image" })));
    }
    else if (isVideo(mimeType)) {
        return (react_1.default.createElement(IconWrapper, { color: colors.R300 },
            react_1.default.createElement(video_1.default, { label: "video" })));
    }
    else if (isAudio(mimeType)) {
        return (react_1.default.createElement(IconWrapper, { color: colors.P200 },
            react_1.default.createElement(audio_1.default, { label: "audio" })));
    }
    else if (isSpreadsheet(mimeType)) {
        return (react_1.default.createElement(IconWrapper, { color: colors.G300 },
            react_1.default.createElement(spreadsheet_1.default, { label: "spreadsheet" })));
    }
    else if (isPresentation(mimeType)) {
        return (react_1.default.createElement(IconWrapper, { color: colors.Y400 },
            react_1.default.createElement(presentation_1.default, { label: "presentation" })));
    }
    else if (isDocument(mimeType)) {
        return (react_1.default.createElement(IconWrapper, { color: colors.B200 },
            react_1.default.createElement(document_1.default, { label: "document" })));
    }
    else if (isPDF(mimeType)) {
        return (react_1.default.createElement(IconWrapper, { color: colors.R400 },
            react_1.default.createElement(pdf_1.default, { label: "pdf document" })));
    }
    else if (isArchive(mimeType)) {
        return (react_1.default.createElement(IconWrapper, { color: colors.N200 },
            react_1.default.createElement(zip_1.default, { label: "zip" })));
    }
    else {
        return (react_1.default.createElement(IconWrapper, { color: colors.N70 },
            react_1.default.createElement(unknown_1.default, { label: "unknown" })));
    }
};
var templateObject_1;
//# sourceMappingURL=mimeTypeToIcon.js.map