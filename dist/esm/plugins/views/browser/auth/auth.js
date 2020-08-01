import { __assign } from "tslib";
import React from 'react';
import { useCallback } from 'react';
import AkButton from '@atlaskit/button';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import { auth } from '@atlaskit/outbound-auth-flow-client';
import { ButtonWrapper, ConnectWrapper, IconWrapper, TextDescription, Title, } from './styled';
export var BrowserAuthView = function (_a) {
    var iconUrl = _a.iconUrl, services = _a.auth, name = _a.name, onAuthSucceeded = _a.onAuthSucceeded, onAuthFailed = _a.onAuthFailed;
    var authUrl = services[0].url;
    var onClick = useCallback(function () {
        auth(authUrl)
            .then(onAuthSucceeded)
            .catch(onAuthFailed);
    }, [authUrl, onAuthFailed, onAuthSucceeded]);
    return (React.createElement(ConnectWrapper, null,
        React.createElement(Title, null,
            React.createElement(FormattedMessage, __assign({}, messages.upload_file_from, { values: { name: name } }))),
        React.createElement(IconWrapper, { src: iconUrl }),
        React.createElement(ButtonWrapper, null,
            React.createElement(AkButton, { appearance: "primary", className: "connectBtn", onClick: onClick },
                React.createElement(FormattedMessage, __assign({}, messages.connect_to, { values: { name: name } })))),
        React.createElement(TextDescription, null,
            React.createElement(FormattedMessage, __assign({}, messages.connect_account_description, { values: { name: name } })))));
};
//# sourceMappingURL=auth.js.map