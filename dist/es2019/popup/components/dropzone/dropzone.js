import React from 'react';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import { Wrapper, Content, Label, Glass } from './styled';
import { UploadIcon } from './icons';
export class Dropzone extends Component {
    render() {
        const { isActive } = this.props;
        return (React.createElement(Wrapper, { isActive: isActive },
            React.createElement(Content, null,
                React.createElement(UploadIcon, null),
                React.createElement(Label, null,
                    React.createElement(FormattedMessage, Object.assign({}, messages.drop_your_files)))),
            React.createElement(Glass, null)));
    }
}
//# sourceMappingURL=dropzone.js.map