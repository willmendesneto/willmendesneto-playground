import { __assign, __extends } from "tslib";
import React from 'react';
import { WarningContainer, WarningHeading, WarningIconWrapper, WarningSuggestion, } from '../warnings/styles';
import { messages } from '@atlaskit/media-ui/messages';
import { FormattedMessage } from 'react-intl';
import { errorIcon } from '../../../../icons';
import Button from '@atlaskit/button';
var NetworkErrorWarning = /** @class */ (function (_super) {
    __extends(NetworkErrorWarning, _super);
    function NetworkErrorWarning() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NetworkErrorWarning.prototype.render = function () {
        return (React.createElement(WarningContainer, null,
            React.createElement(WarningIconWrapper, null, errorIcon),
            React.createElement(WarningHeading, null,
                React.createElement(FormattedMessage, __assign({}, messages.cant_retrieve_files))),
            React.createElement(WarningSuggestion, null,
                React.createElement(FormattedMessage, __assign({}, messages.check_your_network))),
            React.createElement(Button, { onClick: this.props.action },
                React.createElement(FormattedMessage, __assign({}, messages.try_again)))));
    };
    return NetworkErrorWarning;
}(React.Component));
export default NetworkErrorWarning;
//# sourceMappingURL=networkError.js.map