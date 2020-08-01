import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import FolderViewer from './folderView/folderView';
import Auth from './auth/auth';
import { Wrapper } from './styled';
import NetworkErrorWarning from '../warnings/networkError';
import { changeService } from '../../../../popup/actions';
import { WarningContainer } from '../warnings/styles';
export class Browser extends Component {
    constructor() {
        super(...arguments);
        this.renderError = () => {
            return (React.createElement(WarningContainer, { id: "browser-container" },
                React.createElement(NetworkErrorWarning, { action: this.reloadService })));
        };
        this.reloadService = () => {
            const { reloadService, service } = this.props;
            reloadService(service);
        };
    }
    render() {
        const { service, hasError } = this.props;
        const view = hasError ? (this.renderError()) : service.accountId ? (React.createElement(FolderViewer, null)) : (React.createElement(Auth, null));
        return React.createElement(Wrapper, null, view);
    }
}
export default connect(({ view: { service, hasError } }) => ({
    service,
    hasError,
}), dispatch => ({
    reloadService: (service) => dispatch(changeService(service.name)),
}))(Browser);
//# sourceMappingURL=browser.js.map