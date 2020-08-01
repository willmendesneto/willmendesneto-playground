import { __extends } from "tslib";
import { Component } from 'react';
import React from 'react';
import { connect, Provider } from 'react-redux';
import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog';
import { MediaClient } from '@atlaskit/media-client';
import { RECENTS_COLLECTION } from '@atlaskit/media-client/constants';
/* Components */
import Footer from './footer/footer';
import Sidebar from './sidebar/sidebar';
import UploadView from './views/upload/upload';
import GiphyView from './views/giphy/giphyView';
import Browser from './views/browser/browser';
import { Dropzone as DropzonePlaceholder } from './dropzone/dropzone';
import MainEditorView from './views/editor/mainEditorView';
/* actions */
import { startApp } from '../actions/startApp';
import { hidePopup } from '../actions/hidePopup';
import { fileUploadsStart } from '../actions/fileUploadsStart';
import { fileUploadError } from '../actions/fileUploadError';
import { dropzoneDropIn } from '../actions/dropzoneDropIn';
import { dropzoneDragOut } from '../actions/dropzoneDragOut';
import PassContext from './passContext';
import { MediaPickerPopupWrapper, SidebarWrapper, ViewWrapper } from './styled';
import { fileClick } from '../actions/fileClick';
import { Clipboard } from '../../components/clipboard/clipboard';
import { Dropzone } from '../../components/dropzone/dropzone';
import { Browser as BrowserComponent, } from '../../components/browser/browser';
import { LocalUploadComponent } from '../../components/localUpload';
import { resetView } from '../actions/resetView';
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.browserRef = React.createRef();
        _this.dropzoneRef = React.createRef();
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
            return (React.createElement(Clipboard, { mediaClient: _this.componentMediaClient, config: config, onUploadsStart: _this.onDrop, onError: onUploadError }));
        };
        _this.renderBrowser = function () {
            var _a = _this.props, tenantUploadParams = _a.tenantUploadParams, onUploadsStart = _a.onUploadsStart, onUploadError = _a.onUploadError;
            var config = {
                uploadParams: tenantUploadParams,
                shouldCopyFileToRecents: false,
                multiple: true,
            };
            return (React.createElement(BrowserComponent, { ref: _this.browserRef, mediaClient: _this.componentMediaClient, config: config, onUploadsStart: onUploadsStart, onError: onUploadError }));
        };
        _this.renderDropzone = function () {
            var _a = _this.props, onUploadError = _a.onUploadError, tenantUploadParams = _a.tenantUploadParams;
            var config = {
                uploadParams: tenantUploadParams,
                shouldCopyFileToRecents: false,
            };
            return (React.createElement(Dropzone, { ref: _this.dropzoneRef, mediaClient: _this.componentMediaClient, config: config, onUploadsStart: _this.onDrop, onError: onUploadError, onDragEnter: _this.onDragEnter, onDragLeave: _this.onDragLeave }));
        };
        var onStartApp = props.onStartApp, onUploadsStart = props.onUploadsStart, onUploadError = props.onUploadError, tenantMediaClient = props.tenantMediaClient, userMediaClient = props.userMediaClient, tenantUploadParams = props.tenantUploadParams;
        _this.state = {
            isDropzoneActive: false,
        };
        // Context that has both auth providers defined explicitly using to provided contexts.
        // Each of the local components using this context will upload first to user's recents
        // and then copy to a tenant's collection.
        var mediaClient = new MediaClient({
            authProvider: tenantMediaClient.config.authProvider,
            userAuthProvider: userMediaClient.config.authProvider,
        });
        _this.componentMediaClient = mediaClient;
        _this.localUploader = new LocalUploadComponent(mediaClient, {
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
        return (React.createElement(ModalTransition, null, isVisible && (React.createElement(Provider, { store: store },
            React.createElement(ModalDialog, { onClose: onClose, width: "x-large", isChromeless: true },
                React.createElement(PassContext, { store: store, proxyReactContext: proxyReactContext },
                    React.createElement("div", { "data-testid": "media-picker-popup" },
                        React.createElement(MediaPickerPopupWrapper, null,
                            React.createElement(SidebarWrapper, null,
                                React.createElement(Sidebar, { useForgePlugins: useForgePlugins })),
                            React.createElement(ViewWrapper, null,
                                this.renderCurrentView(selectedServiceName),
                                React.createElement(Footer, null)),
                            React.createElement(DropzonePlaceholder, { isActive: isDropzoneActive }),
                            React.createElement(MainEditorView, { localUploader: this.localUploader })),
                        this.renderClipboard(),
                        this.renderDropzone(),
                        this.renderBrowser())))))));
    };
    App.prototype.renderCurrentView = function (selectedServiceName) {
        var _a = this.props, _b = _a.plugins, plugins = _b === void 0 ? [] : _b, onFileClick = _a.onFileClick, selectedItems = _a.selectedItems;
        if (selectedServiceName === 'upload') {
            // We need to create a new context since Cards in recents view need user auth
            var userMediaClient = this.props.userMediaClient;
            return (React.createElement(UploadView, { browserRef: this.browserRef, mediaClient: userMediaClient, recentsCollection: RECENTS_COLLECTION }));
        }
        else if (selectedServiceName === 'giphy') {
            return React.createElement(GiphyView, null);
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
            return React.createElement(Browser, null);
        }
    };
    return App;
}(Component));
export { App };
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
    onStartApp: function (payload) { return dispatch(startApp(payload)); },
    onUploadsStart: function (payload) {
        return dispatch(fileUploadsStart(payload));
    },
    onClose: function () {
        dispatch(resetView());
        dispatch(hidePopup());
    },
    onUploadError: function (payload) {
        return dispatch(fileUploadError(payload));
    },
    onDropzoneDragOut: function (fileCount) {
        return dispatch(dropzoneDragOut(fileCount));
    },
    onDropzoneDropIn: function (fileCount) { return dispatch(dropzoneDropIn(fileCount)); },
    onFileClick: function (serviceFile, serviceName) {
        return dispatch(fileClick(serviceFile, serviceName));
    },
}); };
export default connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=app.js.map