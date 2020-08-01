import { __assign } from "tslib";
import React from 'react';
import Button from '@atlaskit/button';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import { messages } from '@atlaskit/media-ui';
import { PluginErrorContainer, PluginErrorDetails, PluginErrorText, } from './styled';
import { FormattedMessage } from 'react-intl';
export var PluginErrorView = function (_a) {
    var onRetry = _a.onRetry;
    return (React.createElement(PluginErrorContainer, null,
        React.createElement(PluginErrorDetails, null,
            React.createElement(WarningIcon, { label: "warning" }),
            React.createElement(PluginErrorText, null,
                React.createElement(FormattedMessage, __assign({}, messages.something_went_wrong)))),
        React.createElement(Button, { onClick: onRetry },
            React.createElement(FormattedMessage, __assign({}, messages.retry)))));
};
//# sourceMappingURL=error.js.map