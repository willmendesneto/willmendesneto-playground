"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var react_2 = tslib_1.__importDefault(require("react"));
var react_redux_1 = require("react-redux");
var modal_dialog_1 = tslib_1.__importStar(require("@atlaskit/modal-dialog"));
var media_client_1 = require("@atlaskit/media-client");
var constants_1 = require("@atlaskit/media-client/constants");
/* Components */
var footer_1 = tslib_1.__importDefault(require("./footer/footer"));
var sidebar_1 = tslib_1.__importDefault(require("./sidebar/sidebar"));
var upload_1 = tslib_1.__importDefault(require("./views/upload/upload"));
var giphyView_1 = tslib_1.__importDefault(require("./views/giphy/giphyView"));
var browser_1 = tslib_1.__importDefault(require("./views/browser/browser"));
var dropzone_1 = require("./dropzone/dropzone");
var mainEditorView_1 = tslib_1.__importDefault(require("./views/editor/mainEditorView"));
/* actions */
var startApp_1 = require("../actions/startApp");
var hidePopup_1 = require("../actions/hidePopup");
var fileUploadsStart_1 = require("../actions/fileUploadsStart");
var fileUploadError_1 = require("../actions/fileUploadError");
var dropzoneDropIn_1 = require("../actions/dropzoneDropIn");
var dropzoneDragOut_1 = require("../actions/dropzoneDragOut");
var passContext_1 = tslib_1.__importDefault(require("./passContext"));
var styled_1 = require("./styled");
var fileClick_1 = require("../actions/fileClick");
var clipboard_1 = require("../../components/clipboard/clipboard");
var dropzone_2 = require("../../components/dropzone/dropzone");
var browser_2 = require("../../components/browser/browser");
var localUpload_1 = require("../../components/localUpload");
var resetView_1 = require("../actions/resetView");
var App = /** @class */ (function (_super) {
    tslib_1.__extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.browserRef = react_2.default.createRef();
        _this.dropzoneRef = react_2.default.createRef();
        _this.onDragLeave = function (payload) {
            var onDropzoneDragOut = _this.props.onDropzoneDragOut;
            onDropzoneDragOut(payload.length);
            _this.setDropzoneActive(false);
        };
        _this.onDragEnter = function () {
            _this.setDropzoneActive(true);
        };
        _this.onDrop = function (payload) {
            var _a = _this.props, onDropzoneDropIn = _a.onDropzoneDropIn, onUploadsStart = _a.onUploadsStart;
            onDropzoneDropIn(payload.files.length);
            onUploadsStart(payload);
        };
        _this.setDropzoneActive = function (isDropzoneActive) {
            _this.setState({
                isDropzoneActive: isDropzoneActive,
            });
        };
        _this.renderClipboard = function () {
            var _a = _this.props, onUploadError = _a.onUploadError, tenantUploadParams = _a.tenantUploadParams;
            var config = {
                uploadParams: tenantUploadParams,
                shouldCopyFileToRecents: false,
            };
            return (react_2.default.createElement(clipboard_1.Clipboard, { mediaClient: _this.componentMediaClient, config: config, onUploadsStart: _this.onDrop, onError: onUploadError }));
        };
        _this.renderBrowser = function () {
            var _a = _this.props, tenantUploadParams = _a.tenantUploadParams, onUploadsStart = _a.onUploadsStart, onUploadError = _a.onUploadError;
            var config = {
                uploadParams: tenantUploadParams,
                shouldCopyFileToRecents: false,
                multiple: true,
            };
            return (react_2.default.createElement(browser_2.Browser, { ref: _this.browserRef, mediaClient: _this.componentMediaClient, config: config, onUploadsStart: onUploadsStart, onError: onUploadError }));
        };
        _this.renderDropzone = function () {
            var _a = _this.props, onUploadError = _a.onUploadError, tenantUploadParams = _a.tenantUploadParams;
            var config = {
                uploadParams: tenantUploadParams,
                shouldCopyFileToRecents: false,
            };
            return (react_2.default.createElement(dropzone_2.Dropzone, { ref: _this.dropzoneRef, mediaClient: _this.componentMediaClient, config: config, onUploadsStart: _this.onDrop, onError: onUploadError, onDragEnter: _this.onDragEnter, onDragLeave: _this.onDragLeave }));
        };
        var onStartApp = props.onStartApp, onUploadsStart = props.onUploadsStart, onUploadError = props.onUploadError, tenantMediaClient = props.tenantMediaClient, userMediaClient = props.userMediaClient, tenantUploadParams = props.tenantUploadParams;
        _this.state = {
            isDropzoneActive: false,
        };
        // Context that has both auth providers defined explicitly using to provided contexts.
        // Each of the local components using this context will upload first to user's recents
        // and then copy to a tenant's collection.
        var mediaClient = new media_client_1.MediaClient({
            authProvider: tenantMediaClient.config.authProvider,
            userAuthProvider: userMediaClient.config.authProvider,
        });
        _this.componentMediaClient = mediaClient;
        _this.localUploader = new localUpload_1.LocalUploadComponent(mediaClient, {
            uploadParams: tenantUploadParams,
            shouldCopyFileToRecents: false,
        });
        _this.localUploader.on('uploads-start', onUploadsStart);
        _this.localUploader.on('upload-error', onUploadError);
        onStartApp({
            onCancelUpload: function (uniqueIdentifier) {
                _this.browserRef.current &&
                    _this.browserRef.current.cancel(uniqueIdentifier);
                _this.dropzoneRef.current &&
                    _this.dropzoneRef.current.cancel(uniqueIdentifier);
                _this.localUploader.cancel(uniqueIdentifier);
            },
        });
        return _this;
    }
    App.prototype.render = function () {
        var _a = this.props, selectedServiceName = _a.selectedServiceName, isVisible = _a.isVisible, onClose = _a.onClose, store = _a.store, proxyReactContext = _a.proxyReactContext, _b = _a.useForgePlugins, useForgePlugins = _b === void 0 ? false : _b;
        var isDropzoneActive = this.state.isDropzoneActive;
        return (react_2.default.createElement(modal_dialog_1.ModalTransition, null, isVisible && (react_2.default.createElement(react_redux_1.Provider, { store: store },
            react_2.default.createElement(modal_dialog_1.default, { onClose: onClose, width: "x-large", isChromeless: true },
                react_2.default.createElement(passContext_1.default, { store: store, proxyReactContext: proxyReactContext },
                    react_2.default.createElement("div", { "data-testid": "media-picker-popup" },
                        react_2.default.createElement(styled_1.MediaPickerPopupWrapper, null,
                            react_2.default.createElement(styled_1.SidebarWrapper, null,
                                react_2.default.createElement(sidebar_1.default, { useForgePlugins: useForgePlugins })),
                            react_2.default.createElement(styled_1.ViewWrapper, null,
                                this.renderCurrentView(selectedServiceName),
                                react_2.default.createElement(footer_1.default, null)),
                            react_2.default.createElement(dropzone_1.Dropzone, { isActive: isDropzoneActive }),
                            react_2.default.createElement(mainEditorView_1.default, { localUploader: this.localUploader })),
                        this.renderClipboard(),
                        this.renderDropzone(),
                        this.renderBrowser())))))));
    };
    App.prototype.renderCurrentView = function (selectedServiceName) {
        var _a = this.props, _b = _a.plugins, plugins = _b === void 0 ? [] : _b, onFileClick = _a.onFileClick, selectedItems = _a.selectedItems;
        if (selectedServiceName === 'upload') {
            // We need to create a new context since Cards in recents view need user auth
            var userMediaClient = this.props.userMediaClient;
            return (react_2.default.createElement(upload_1.default, { browserRef: this.browserRef, mediaClient: userMediaClient, recentsCollection: constants_1.RECENTS_COLLECTION }));
        }
        else if (selectedServiceName === 'giphy') {
            return react_2.default.createElement(giphyView_1.default, null);
        }
        else {
            var selectedPlugin = plugins.find(function (plugin) { return plugin.name === selectedServiceName; });
            if (selectedPlugin) {
                var actions = {
                    fileClick: function (pluginFile, pluginName) {
                        var serviceFile = {
                            id: pluginFile.id,
                            date: new Date().getTime(),
                            mimeType: '',
                            name: '',
                            size: 0,
                            metadata: pluginFile.metadata,
                        };
                        onFileClick(serviceFile, pluginName);
                    },
                };
                return selectedPlugin.render(actions, selectedItems);
            }
            return react_2.default.createElement(browser_1.default, null);
        }
    };
    return App;
}(react_1.Component));
exports.App = App;
var mapStateToProps = function (_a) {
    var view = _a.view, tenantMediaClient = _a.tenantMediaClient, userMediaClient = _a.userMediaClient, config = _a.config, plugins = _a.plugins, selectedItems = _a.selectedItems;
    return ({
        selectedServiceName: view.service.name,
        isVisible: view.isVisible,
        config: config,
        plugins: plugins,
        selectedItems: selectedItems,
        tenantMediaClient: tenantMediaClient,
        userMediaClient: userMediaClient,
    });
};
var mapDispatchToProps = function (dispatch) { return ({
    onStartApp: function (payload) { return dispatch(startApp_1.startApp(payload)); },
    onUploadsStart: function (payload) {
        return dispatch(fileUploadsStart_1.fileUploadsStart(payload));
    },
    onClose: function () {
        dispatch(resetView_1.resetView());
        dispatch(hidePopup_1.hidePopup());
    },
    onUploadError: function (payload) {
        return dispatch(fileUploadError_1.fileUploadError(payload));
    },
    onDropzoneDragOut: function (fileCount) {
        return dispatch(dropzoneDragOut_1.dropzoneDragOut(fileCount));
    },
    onDropzoneDropIn: function (fileCount) { return dispatch(dropzoneDropIn_1.dropzoneDropIn(fileCount)); },
    onFileClick: function (serviceFile, serviceName) {
        return dispatch(fileClick_1.fileClick(serviceFile, serviceName));
    },
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=app.js.map