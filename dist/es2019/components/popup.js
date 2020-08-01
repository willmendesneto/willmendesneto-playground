import { MediaClient } from '@atlaskit/media-client';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import * as exenv from 'exenv';
import App from '../popup/components/app';
import { showPopup } from '../popup/actions/showPopup';
import { getFilesInRecents } from '../popup/actions/getFilesInRecents';
import { getForgePlugins } from '../popup/actions';
import { hidePopup } from '../popup/actions/hidePopup';
import { cancelUpload } from '../popup/actions/cancelUpload';
import { failureErrorLogger } from '../popup/actions/failureErrorLogger';
import { createStore } from '../store';
import { UploadComponent } from './component';
import { defaultUploadParams } from '../domain/uploadParams';
import { createPopupUserAuthProvider } from './popup-auth';
export class PopupImpl extends UploadComponent {
    constructor(tenantMediaClient, { container = exenv.canUseDOM ? document.body : undefined, uploadParams, // tenant
    proxyReactContext, singleSelect, plugins, useForgePlugins = false, }) {
        super();
        this.tenantMediaClient = tenantMediaClient;
        this.proxyReactContext = proxyReactContext;
        this.useForgePlugins = useForgePlugins;
        const userAuthProvider = createPopupUserAuthProvider(tenantMediaClient.stargate, tenantMediaClient.config);
        const userMediaClient = new MediaClient({
            authProvider: userAuthProvider,
        });
        const tenantUploadParams = {
            ...defaultUploadParams,
            ...uploadParams,
        };
        this.store = createStore(this, tenantMediaClient, userMediaClient, {
            proxyReactContext,
            singleSelect,
            uploadParams: tenantUploadParams,
            plugins,
        });
        this.tenantUploadParams = tenantUploadParams;
        const popup = this.renderPopup();
        if (!popup) {
            return;
        }
        this.container = popup;
        if (container) {
            container.appendChild(popup);
        }
    }
    async show() {
        const { dispatch } = this.store;
        dispatch(getFilesInRecents());
        if (this.useForgePlugins) {
            dispatch(getForgePlugins());
        }
        dispatch(showPopup());
    }
    async cancel(uniqueIdentifier) {
        if (!uniqueIdentifier) {
            return;
        }
        this.store.dispatch(cancelUpload({ tenantFileId: await uniqueIdentifier }));
    }
    teardown() {
        if (!this.container) {
            return;
        }
        try {
            unmountComponentAtNode(this.container);
            this.container.remove();
        }
        catch (error) {
            const { dispatch } = this.store;
            dispatch(failureErrorLogger({
                error,
                info: '`ChildNode#remove()` polyfill is not available in client',
            }));
        }
    }
    hide() {
        this.store.dispatch(hidePopup());
    }
    setUploadParams(uploadParams) {
        this.tenantUploadParams = {
            ...defaultUploadParams,
            ...uploadParams,
        };
    }
    emitClosed() {
        this.emit('closed', undefined);
    }
    renderPopup() {
        if (!exenv.canUseDOM) {
            return;
        }
        const container = document.createElement('div');
        render(React.createElement(App, { store: this.store, proxyReactContext: this.proxyReactContext, tenantUploadParams: this.tenantUploadParams, useForgePlugins: this.useForgePlugins }), container);
        return container;
    }
}
//# sourceMappingURL=popup.js.map