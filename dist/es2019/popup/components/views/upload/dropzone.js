'use strict';
import React from 'react';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import LocalBrowserButton from './uploadButton';
import { filesIcon } from '../../../../icons';
import { ButtonWrapper, DefaultImage, DropzoneText, DropzoneContainer, DropzoneContentWrapper, TextWrapper, } from './styled';
export class Dropzone extends Component {
    render() {
        const { isEmpty, browserRef } = this.props;
        return (React.createElement(DropzoneContainer, { isEmpty: isEmpty },
            React.createElement(DropzoneContentWrapper, null,
                React.createElement(DefaultImage, { src: filesIcon }),
                React.createElement(TextWrapper, null,
                    React.createElement(DropzoneText, null,
                        React.createElement(FormattedMessage, Object.assign({}, messages.drag_and_drop_your_files))),
                    React.createElement(ButtonWrapper, null,
                        React.createElement(LocalBrowserButton, { browserRef: browserRef }))))));
    }
}
//# sourceMappingURL=dropzone.js.map