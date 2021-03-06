import { __assign, __extends } from "tslib";
import React from 'react';
import { connect } from 'react-redux';
import Button from '@atlaskit/button';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import { startFileBrowser } from '../../../actions/startFileBrowser';
var LocalBrowserButton = /** @class */ (function (_super) {
    __extends(LocalBrowserButton, _super);
    function LocalBrowserButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onUploadClick = function () {
            var _a = _this.props, browserRef = _a.browserRef, onClick = _a.onClick;
            onClick();
            if (browserRef && browserRef.current) {
                browserRef.current.browse();
            }
        };
        return _this;
    }
    LocalBrowserButton.prototype.render = function () {
        return (React.createElement(Button, { "data-testid": "media-picker-upload-button", appearance: "default", onClick: this.onUploadClick },
            React.createElement(FormattedMessage, __assign({}, messages.upload_file))));
    };
    return LocalBrowserButton;
}(React.Component));
export { LocalBrowserButton };
var mapDispatchToProps = function (dispatch) { return ({
    onClick: function () { return dispatch(startFileBrowser()); },
}); };
export default connect(null, mapDispatchToProps)(LocalBrowserButton);
//# sourceMappingURL=uploadButton.js.map