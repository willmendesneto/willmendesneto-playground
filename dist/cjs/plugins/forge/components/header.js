"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var textfield_1 = tslib_1.__importDefault(require("@atlaskit/textfield"));
var styled_1 = require("./styled");
var react_intl_1 = require("react-intl");
var media_ui_1 = require("@atlaskit/media-ui");
exports.PluginHeader = react_intl_1.injectIntl(function (_a) {
    var name = _a.name, loading = _a.loading, error = _a.error, totalImages = _a.totalImages, onQueryChange = _a.onQueryChange, query = _a.query, formatMessage = _a.intl.formatMessage;
    var isReady = !loading && !error;
    var hasImages = isReady && typeof totalImages === 'number';
    return (react_1.default.createElement(styled_1.PluginHeaderWrapper, null,
        react_1.default.createElement("h3", null, name),
        !error && hasImages && (react_1.default.createElement(textfield_1.default, { placeholder: formatMessage(media_ui_1.messages.search), onChange: onQueryChange, value: query, width: 420 }))));
});
//# sourceMappingURL=header.js.map