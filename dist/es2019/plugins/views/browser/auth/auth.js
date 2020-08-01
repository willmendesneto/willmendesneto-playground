import React from 'react';
import { useCallback } from 'react';
import AkButton from '@atlaskit/button';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import { auth } from '@atlaskit/outbound-auth-flow-client';
import { ButtonWrapper, ConnectWrapper, IconWrapper, TextDescription, Title, } from './styled';
export const BrowserAuthView = ({ iconUrl, auth: services, name, onAuthSucceeded, onAuthFailed, }) => {
    const authUrl = services[0].url;
    const onClick = useCallback(() => {
        auth(authUrl)
            .then(onAuthSucceeded)
            .catch(onAuthFailed);
    }, [authUrl, onAuthFailed, onAuthSucceeded]);
    return (React.createElement(ConnectWrapper, null,
        React.createElement(Title, null,
            React.createElement(FormattedMessage, Object.assign({}, messages.upload_file_from, { values: { name } }))),
        React.createElement(IconWrapper, { src: iconUrl }),
        React.createElement(ButtonWrapper, null,
            React.createElement(AkButton, { appearance: "primary", className: "connectBtn", onClick: onClick },
                React.createElement(FormattedMessage, Object.assign({}, messages.connect_to, { values: { name } })))),
        React.createElement(TextDescription, null,
            React.createElement(FormattedMessage, Object.assign({}, messages.connect_account_description, { values: { name } })))));
};
//# sourceMappingURL=auth.js.map