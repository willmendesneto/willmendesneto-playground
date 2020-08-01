import React from 'react';
import { WarningContainer, WarningHeading, WarningIconWrapper, WarningSuggestion, } from '../warnings/styles';
import { messages } from '@atlaskit/media-ui/messages';
import { FormattedMessage } from 'react-intl';
import { errorIcon } from '../../../../icons';
import Button from '@atlaskit/button';
class NetworkErrorWarning extends React.Component {
    render() {
        return (React.createElement(WarningContainer, null,
            React.createElement(WarningIconWrapper, null, errorIcon),
            React.createElement(WarningHeading, null,
                React.createElement(FormattedMessage, Object.assign({}, messages.cant_retrieve_files))),
            React.createElement(WarningSuggestion, null,
                React.createElement(FormattedMessage, Object.assign({}, messages.check_your_network))),
            React.createElement(Button, { onClick: this.props.action },
                React.createElement(FormattedMessage, Object.assign({}, messages.try_again)))));
    }
}
export default NetworkErrorWarning;
//# sourceMappingURL=networkError.js.map