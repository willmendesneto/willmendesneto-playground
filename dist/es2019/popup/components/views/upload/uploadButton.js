import React from 'react';
import { connect } from 'react-redux';
import Button from '@atlaskit/button';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import { startFileBrowser } from '../../../actions/startFileBrowser';
export class LocalBrowserButton extends React.Component {
    constructor() {
        super(...arguments);
        this.onUploadClick = () => {
            const { browserRef, onClick } = this.props;
            onClick();
            if (browserRef && browserRef.current) {
                browserRef.current.browse();
            }
        };
    }
    render() {
        return (React.createElement(Button, { "data-testid": "media-picker-upload-button", appearance: "default", onClick: this.onUploadClick },
            React.createElement(FormattedMessage, Object.assign({}, messages.upload_file))));
    }
}
const mapDispatchToProps = (dispatch) => ({
    onClick: () => dispatch(startFileBrowser()),
});
export default connect(null, mapDispatchToProps)(LocalBrowserButton);
//# sourceMappingURL=uploadButton.js.map