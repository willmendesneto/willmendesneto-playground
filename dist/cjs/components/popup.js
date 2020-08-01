"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var media_client_1 = require("@atlaskit/media-client");
var react_1 = tslib_1.__importDefault(require("react"));
var react_dom_1 = require("react-dom");
var exenv = tslib_1.__importStar(require("exenv"));
var app_1 = tslib_1.__importDefault(require("../popup/components/app"));
var showPopup_1 = require("../popup/actions/showPopup");
var getFilesInRecents_1 = require("../popup/actions/getFilesInRecents");
var actions_1 = require("../popup/actions");
var hidePopup_1 = require("../popup/actions/hidePopup");
var cancelUpload_1 = require("../popup/actions/cancelUpload");
var failureErrorLogger_1 = require("../popup/actions/failureErrorLogger");
var store_1 = require("../store");
var component_1 = require("./component");
var uploadParams_1 = require("../domain/uploadParams");
var popup_auth_1 = require("./popup-auth");
var PopupImpl = /** @class */ (function (_super) {
    tslib_1.__extends(PopupImpl, _super);
    function PopupImpl(tenantMediaClient, _a) {
        var _b = _a.container, container = _b === void 0 ? exenv.canUseDOM ? document.body : undefined : _b, uploadParams = _a.uploadParams, // tenant
        proxyReactContext = _a.proxyReactContext, singleSelect = _a.singleSelect, plugins = _a.plugins, _c = _a.useForgePlugins, useForgePlugins = _c === void 0 ? false : _c;
        var _this = _super.call(this) || this;
        _this.tenantMediaClient = tenantMediaClient;
        _this.proxyReactContext = proxyReactContext;
        _this.useForgePlugins = useForgePlugins;
        var userAuthProvider = popup_auth_1.createPopupUserAuthProvider(tenantMediaClient.stargate, tenantMediaClient.config);
        var userMediaClient = new media_client_1.MediaClient({
            authProvider: userAuthProvider,
        });
        var tenantUploadParams = tslib_1.__assign(tslib_1.__assign({}, uploadParams_1.defaultUploadParams), uploadParams);
        _this.store = store_1.createStore(_this, tenantMediaClient, userMediaClient, {
            proxyReactContext: proxyReactContext,
            singleSelect: singleSelect,
            uploadParams: tenantUploadParams,
            plugins: plugins,
        });
        _this.tenantUploadParams = tenantUploadParams;
        var popup = _this.renderPopup();
        if (!popup) {
            return _this;
        }
        _this.container = popup;
        if (container) {
            container.appendChild(popup);
        }
        return _this;
    }
    PopupImpl.prototype.show = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dispatch;
            return tslib_1.__generator(this, function (_a) {
                dispatch = this.store.dispatch;
                dispatch(getFilesInRecents_1.getFilesInRecents());
                if (this.useForgePlugins) {
                    dispatch(actions_1.getForgePlugins());
                }
                dispatch(showPopup_1.showPopup());
                return [2 /*return*/];
            });
        });
    };
    PopupImpl.prototype.cancel = function (uniqueIdentifier) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!uniqueIdentifier) {
                            return [2 /*return*/];
                        }
                        _b = (_a = this.store).dispatch;
                        _c = cancelUpload_1.cancelUpload;
                        _d = {};
                        return [4 /*yield*/, uniqueIdentifier];
                    case 1:
                        _b.apply(_a, [_c.apply(void 0, [(_d.tenantFileId = _e.sent(), _d)])]);
                        return [2 /*return*/];
                }
            });
        });
    };
    PopupImpl.prototype.teardown = function () {
        if (!this.container) {
            return;
        }
        try {
            react_dom_1.unmountComponentAtNode(this.container);
            this.container.remove();
        }
        catch (error) {
            var dispatch = this.store.dispatch;
            dispatch(failureErrorLogger_1.failureErrorLogger({
                error: error,
                info: '`ChildNode#remove()` polyfill is not available in client',
            }));
        }
    };
    PopupImpl.prototype.hide = function () {
        this.store.dispatch(hidePopup_1.hidePopup());
    };
    PopupImpl.prototype.setUploadParams = function (uploadParams) {
        this.tenantUploadParams = tslib_1.__assign(tslib_1.__assign({}, uploadParams_1.defaultUploadParams), uploadParams);
    };
    PopupImpl.prototype.emitClosed = function () {
        this.emit('closed', undefined);
    };
    PopupImpl.prototype.renderPopup = function () {
        if (!exenv.canUseDOM) {
            return;
        }
        var container = document.createElement('div');
        react_dom_1.render(react_1.default.createElement(app_1.default, { store: this.store, proxyReactContext: this.proxyReactContext, tenantUploadParams: this.tenantUploadParams, useForgePlugins: this.useForgePlugins }), container);
        return container;
    };
    return PopupImpl;
}(component_1.UploadComponent));
exports.PopupImpl = PopupImpl;
//# sourceMappingURL=popup.js.map