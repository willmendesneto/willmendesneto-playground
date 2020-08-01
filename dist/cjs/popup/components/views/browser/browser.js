"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("react");
var react_redux_1 = require("react-redux");
var folderView_1 = tslib_1.__importDefault(require("./folderView/folderView"));
var auth_1 = tslib_1.__importDefault(require("./auth/auth"));
var styled_1 = require("./styled");
var networkError_1 = tslib_1.__importDefault(require("../warnings/networkError"));
var actions_1 = require("../../../../popup/actions");
var styles_1 = require("../warnings/styles");
var Browser = /** @class */ (function (_super) {
    tslib_1.__extends(Browser, _super);
    function Browser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderError = function () {
            return (react_1.default.createElement(styles_1.WarningContainer, { id: "browser-container" },
                react_1.default.createElement(networkError_1.default, { action: _this.reloadService })));
        };
        _this.reloadService = function () {
            var _a = _this.props, reloadService = _a.reloadService, service = _a.service;
            reloadService(service);
        };
        return _this;
    }
    Browser.prototype.render = function () {
        var _a = this.props, service = _a.service, hasError = _a.hasError;
        var view = hasError ? (this.renderError()) : service.accountId ? (react_1.default.createElement(folderView_1.default, null)) : (react_1.default.createElement(auth_1.default, null));
        return react_1.default.createElement(styled_1.Wrapper, null, view);
    };
    return Browser;
}(react_2.Component));
exports.Browser = Browser;
exports.default = react_redux_1.connect(function (_a) {
    var _b = _a.view, service = _b.service, hasError = _b.hasError;
    return ({
        service: service,
        hasError: hasError,
    });
}, function (dispatch) { return ({
    reloadService: function (service) {
        return dispatch(actions_1.changeService(service.name));
    },
}); })(Browser);
//# sourceMappingURL=browser.js.map