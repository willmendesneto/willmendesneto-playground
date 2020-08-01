"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var styles_1 = require("../warnings/styles");
var messages_1 = require("@atlaskit/media-ui/messages");
var react_intl_1 = require("react-intl");
var icons_1 = require("../../../../icons");
var button_1 = tslib_1.__importDefault(require("@atlaskit/button"));
var NetworkErrorWarning = /** @class */ (function (_super) {
    tslib_1.__extends(NetworkErrorWarning, _super);
    function NetworkErrorWarning() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NetworkErrorWarning.prototype.render = function () {
        return (react_1.default.createElement(styles_1.WarningContainer, null,
            react_1.default.createElement(styles_1.WarningIconWrapper, null, icons_1.errorIcon),
            react_1.default.createElement(styles_1.WarningHeading, null,
                react_1.default.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, messages_1.messages.cant_retrieve_files))),
            react_1.default.createElement(styles_1.WarningSuggestion, null,
                react_1.default.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, messages_1.messages.check_your_network))),
            react_1.default.createElement(button_1.default, { onClick: this.props.action },
                react_1.default.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, messages_1.messages.try_again)))));
    };
    return NetworkErrorWarning;
}(react_1.default.Component));
exports.default = NetworkErrorWarning;
//# sourceMappingURL=networkError.js.map