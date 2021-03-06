import { __assign, __extends } from "tslib";
import React from 'react';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import { Wrapper, Content, Label, Glass } from './styled';
import { UploadIcon } from './icons';
var Dropzone = /** @class */ (function (_super) {
    __extends(Dropzone, _super);
    function Dropzone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dropzone.prototype.render = function () {
        var isActive = this.props.isActive;
        return (React.createElement(Wrapper, { isActive: isActive },
            React.createElement(Content, null,
                React.createElement(UploadIcon, null),
                React.createElement(Label, null,
                    React.createElement(FormattedMessage, __assign({}, messages.drop_your_files)))),
            React.createElement(Glass, null)));
    };
    return Dropzone;
}(Component));
export { Dropzone };
//# sourceMappingURL=dropzone.js.map