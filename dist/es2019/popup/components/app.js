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
export class App extends Component {
    constructor(props) {
        super(props);
        this.browserRef = React.createRef();
        this.dropzoneRef = React.createRef();
        this.onDragLeave = (payload) => {
            const { onDropzoneDragOut } = this.props;
            onDropzoneDragOut(payload.length);
            this.setDropzoneActive(false);
        };
        this.onDragEnter = () => {
            this.setDropzoneActive(true);
        };
        this.onDrop = (payload) => {
            const { onDropzoneDropIn, onUploadsStart } = this.props;
            onDropzoneDropIn(payload.files.length);
            onUploadsStart(payload);
        };
        this.setDropzoneActive = (isDropzoneActive) => {
            this.setState({
                isDropzoneActive,
            });
        };
        this.renderClipboard = () => {
            const { onUploadError, tenantUploadParams } = this.props;
            const config = {
                uploadParams: tenantUploadParams,
                shouldCopyFileToRecents: false,
            };
            return (React.createElement(Clipboard, { mediaClient: this.componentMediaClient, config: config, onUploadsStart: this.onDrop, onError: onUploadError }));
        };
        this.renderBrowser = () => {
            const { tenantUploadParams, onUploadsStart, onUploadError } = this.props;
            const config = {
                uploadParams: tenantUploadParams,
                shouldCopyFileToRecents: false,
                multiple: true,
            };
            return (React.createElement(BrowserComponent, { ref: this.browserRef, mediaClient: this.componentMediaClient, config: config, onUploadsStart: onUploadsStart, onError: onUploadError }));
        };
        this.renderDropzone = () => {
            const { onUploadError, tenantUploadParams } = this.props;
            const config = {
                uploadParams: tenantUploadParams,
                shouldCopyFileToRecents: false,
            };
            return (React.createElement(Dropzone, { ref: this.dropzoneRef, mediaClient: this.componentMediaClient, config: config, onUploadsStart: this.onDrop, onError: onUploadError, onDragEnter: this.onDragEnter, onDragLeave: this.onDragLeave }));
        };
        const { onStartApp, onUploadsStart, onUploadError, tenantMediaClient, userMediaClient, tenantUploadParams, } = props;
        this.state = {
            isDropzoneActive: false,
        };
        // Context that has both auth providers defined explicitly using to provided contexts.
        // Each of the local components using this context will upload first to user's recents
        // and then copy to a tenant's collection.
        const mediaClient = new MediaClient({
            authProvider: tenantMediaClient.config.authProvider,
            userAuthProvider: userMediaClient.config.authProvider,
        });
        this.componentMediaClient = mediaClient;
        this.localUploader = new LocalUploadComponent(mediaClient, {
            uploadParams: tenantUploadParams,
            shouldCopyFileToRecents: false,
        });
        this.localUploader.on('uploads-start', onUploadsStart);
        this.localUploader.on('upload-error', onUploadError);
        onStartApp({
            onCancelUpload: uniqueIdentifier => {
                this.browserRef.current &&
                    this.browserRef.current.cancel(uniqueIdentifier);
                this.dropzoneRef.current &&
                    this.dropzoneRef.current.cancel(uniqueIdentifier);
                this.localUploader.cancel(uniqueIdentifier);
            },
        });
    }
    render() {
        const { selectedServiceName, isVisible, onClose, store, proxyReactContext, useForgePlugins = false, } = this.props;
        const { isDropzoneActive } = this.state;
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
    }
    renderCurrentView(selectedServiceName) {
        const { plugins = [], onFileClick, selectedItems } = this.props;
        if (selectedServiceName === 'upload') {
            // We need to create a new context since Cards in recents view need user auth
            const { userMediaClient } = this.props;
            return (React.createElement(UploadView, { browserRef: this.browserRef, mediaClient: userMediaClient, recentsCollection: RECENTS_COLLECTION }));
        }
        else if (selectedServiceName === 'giphy') {
            return React.createElement(GiphyView, null);
        }
        else {
            const selectedPlugin = plugins.find(plugin => plugin.name === selectedServiceName);
            if (selectedPlugin) {
                const actions = {
                    fileClick(pluginFile, pluginName) {
                        const serviceFile = {
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
    }
}
const mapStateToProps = ({ view, tenantMediaClient, userMediaClient, config, plugins, selectedItems, }) => ({
    selectedServiceName: view.service.name,
    isVisible: view.isVisible,
    config,
    plugins,
    selectedItems,
    tenantMediaClient,
    userMediaClient,
});
const mapDispatchToProps = (dispatch) => ({
    onStartApp: (payload) => dispatch(startApp(payload)),
    onUploadsStart: (payload) => dispatch(fileUploadsStart(payload)),
    onClose: () => {
        dispatch(resetView());
        dispatch(hidePopup());
    },
    onUploadError: (payload) => dispatch(fileUploadError(payload)),
    onDropzoneDragOut: (fileCount) => dispatch(dropzoneDragOut(fileCount)),
    onDropzoneDropIn: (fileCount) => dispatch(dropzoneDropIn(fileCount)),
    onFileClick: (serviceFile, serviceName) => dispatch(fileClick(serviceFile, serviceName)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=app.js.map