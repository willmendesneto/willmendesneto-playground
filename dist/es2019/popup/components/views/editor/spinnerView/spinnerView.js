import React from 'react';
import { Component } from 'react';
import Spinner from '@atlaskit/spinner';
import { EscHelper } from '../escHelper';
import { CenterView } from '../styles';
export class SpinnerView extends Component {
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
            React.createElement(Spinner, { size: "large", appearance: "invert" })));
    }
}
//# sourceMappingURL=spinnerView.js.map