"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("react");
var button_1 = tslib_1.__importDefault(require("@atlaskit/button"));
var react_intl_1 = require("react-intl");
var media_ui_1 = require("@atlaskit/media-ui");
var outbound_auth_flow_client_1 = require("@atlaskit/outbound-auth-flow-client");
var styled_1 = require("./styled");
exports.BrowserAuthView = function (_a) {
    var iconUrl = _a.iconUrl, services = _a.auth, name = _a.name, onAuthSucceeded = _a.onAuthSucceeded, onAuthFailed = _a.onAuthFailed;
    var authUrl = services[0].url;
    var onClick = react_2.useCallback(function () {
        outbound_auth_flow_client_1.auth(authUrl)
            .then(onAuthSucceeded)
            .catch(onAuthFailed);
    }, [authUrl, onAuthFailed, onAuthSucceeded]);
    return (react_1.default.createElement(styled_1.ConnectWrapper, null,
        react_1.default.createElement(styled_1.Title, null,
            react_1.default.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, media_ui_1.messages.upload_file_from, { values: { name: name } }))),
        react_1.default.createElement(styled_1.IconWrapper, { src: iconUrl }),
        react_1.default.createElement(styled_1.ButtonWrapper, null,
            react_1.default.createElement(button_1.default, { appearance: "primary", className: "connectBtn", onClick: onClick },
                react_1.default.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, media_ui_1.messages.connect_to, { values: { name: name } })))),
        react_1.default.createElement(styled_1.TextDescription, null,
            react_1.default.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, media_ui_1.messages.connect_account_description, { values: { name: name } })))));
};
//# sourceMappingURL=auth.js.map