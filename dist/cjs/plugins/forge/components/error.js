"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var button_1 = tslib_1.__importDefault(require("@atlaskit/button"));
var warning_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/warning"));
var media_ui_1 = require("@atlaskit/media-ui");
var styled_1 = require("./styled");
var react_intl_1 = require("react-intl");
exports.PluginErrorView = function (_a) {
    var onRetry = _a.onRetry;
    return (react_1.default.createElement(styled_1.PluginErrorContainer, null,
        react_1.default.createElement(styled_1.PluginErrorDetails, null,
            react_1.default.createElement(warning_1.default, { label: "warning" }),
            react_1.default.createElement(styled_1.PluginErrorText, null,
                react_1.default.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, media_ui_1.messages.something_went_wrong)))),
        react_1.default.createElement(button_1.default, { onClick: onRetry },
            react_1.default.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, media_ui_1.messages.retry)))));
};
//# sourceMappingURL=error.js.map