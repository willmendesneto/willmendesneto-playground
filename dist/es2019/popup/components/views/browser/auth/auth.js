import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import AkButton from '@atlaskit/button';
import DropboxIcon from '@atlaskit/icon/glyph/dropbox';
import GoogledriveIcon from '@atlaskit/icon/glyph/googledrive';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import { startAuth } from '../../../../actions/startAuth';
import { ButtonWrapper, ConnectWrapper, IconWrapper, TextDescription, Title, } from './styled';
const serviceDetails = {
    dropbox: {
        name: 'Dropbox',
        icon: React.createElement(DropboxIcon, { label: "dropbox", size: "xlarge" }),
    },
    google: {
        name: 'Google Drive',
        icon: React.createElement(GoogledriveIcon, { label: "drive", size: "xlarge" }),
    },
};
/**
 * Routing class that displays view depending on situation.
 */
export class StatelessAuth extends Component {
    constructor() {
        super(...arguments);
        this.onClick = () => this.props.onStartAuth(this.props.service.name);
    }
    render() {
        const { service } = this.props;
        const details = serviceDetails[service.name];
        if (!details) {
            return null;
        }
        const { name, icon } = details;
        return (React.createElement(ConnectWrapper, null,
            React.createElement(Title, null,
                React.createElement(FormattedMessage, Object.assign({}, messages.upload_file_from, { values: { name } }))),
            React.createElement(IconWrapper, null, icon),
            React.createElement(ButtonWrapper, null,
                React.createElement(AkButton, { appearance: "primary", className: "connectBtn", onClick: this.onClick },
                    React.createElement(FormattedMessage, Object.assign({}, messages.connect_to, { values: { name } })))),
            React.createElement(TextDescription, null,
                React.createElement(FormattedMessage, Object.assign({}, messages.connect_account_description, { values: { name } })))));
    }
}
export default connect(state => ({
    service: state.view.service,
}), dispatch => ({
    onStartAuth: (serviceName) => dispatch(startAuth(serviceName)),
}))(StatelessAuth);
//# sourceMappingURL=auth.js.map