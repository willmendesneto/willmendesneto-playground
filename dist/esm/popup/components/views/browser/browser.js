import { __extends } from "tslib";
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import FolderViewer from './folderView/folderView';
import Auth from './auth/auth';
import { Wrapper } from './styled';
import NetworkErrorWarning from '../warnings/networkError';
import { changeService } from '../../../../popup/actions';
import { WarningContainer } from '../warnings/styles';
var Browser = /** @class */ (function (_super) {
    __extends(Browser, _super);
    function Browser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderError = function () {
            return (React.createElement(WarningContainer, { id: "browser-container" },
                React.createElement(NetworkErrorWarning, { action: _this.reloadService })));
        };
        _this.reloadService = function () {
            var _a = _this.props, reloadService = _a.reloadService, service = _a.service;
            reloadService(service);
        };
        return _this;
    }
    Browser.prototype.render = function () {
        var _a = this.props, service = _a.service, hasError = _a.hasError;
        var view = hasError ? (this.renderError()) : service.accountId ? (React.createElement(FolderViewer, null)) : (React.createElement(Auth, null));
        return React.createElement(Wrapper, null, view);
    };
    return Browser;
}(Component));
export { Browser };
export default connect(function (_a) {
    var _b = _a.view, service = _b.service, hasError = _b.hasError;
    return ({
        service: service,
        hasError: hasError,
    });
}, function (dispatch) { return ({
    reloadService: function (service) {
        return dispatch(changeService(service.name));
    },
}); })(Browser);
//# sourceMappingURL=browser.js.map