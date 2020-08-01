import React from 'react';
import { Component } from 'react';
import { messages } from '@atlaskit/media-ui';
import { injectIntl } from 'react-intl';
import { EscHelper } from '../escHelper';
import { CenterView } from '../styles';
import { ErrorPopup, ErrorIconWrapper, ErrorMessage, ErrorHint, ErrorButton, } from './styles';
import { errorIcon } from '../../../../../icons';
export class ErrorView extends Component {
    componentDidMount() {
        this.escHelper = new EscHelper(this.props.onCancel);
    }
    componentWillUnmount() {
        if (this.escHelper) {
            this.escHelper.teardown();
        }
    }
    render() {
        return (React.createElement(CenterView, null,
            React.createElement(ErrorPopup, null,
                React.createElement(ErrorIconWrapper, null, errorIcon),
                React.createElement(ErrorMessage, null, this.props.message),
                React.createElement(ErrorHint, null, this.renderHint()),
                this.renderTryAgainButton(),
                this.renderCancelButton())));
    }
    renderHint() {
        const { onRetry, intl: { formatMessage }, } = this.props;
        if (onRetry) {
            return React.createElement("span", null, formatMessage(messages.error_hint_retry));
        }
        return React.createElement("span", null, formatMessage(messages.error_hint_critical));
    }
    renderTryAgainButton() {
        const { onRetry, intl: { formatMessage }, } = this.props;
        if (onRetry) {
            return (React.createElement(ErrorButton, { appearance: "primary", onClick: onRetry }, formatMessage(messages.try_again)));
        }
        return null;
    }
    renderCancelButton() {
        const { onCancel, onRetry, intl: { formatMessage }, } = this.props;
        const message = onRetry ? messages.cancel : messages.close;
        return (React.createElement(ErrorButton, { appearance: "subtle", onClick: onCancel }, formatMessage(message)));
    }
}
export default injectIntl(ErrorView);
//# sourceMappingURL=errorView.js.map