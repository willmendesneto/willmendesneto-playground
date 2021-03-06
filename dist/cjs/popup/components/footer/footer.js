"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("react");
var react_redux_1 = require("react-redux");
var react_intl_1 = require("react-intl");
var media_ui_1 = require("@atlaskit/media-ui");
var styled_1 = require("./styled");
var actions_1 = require("../../actions");
var Footer = /** @class */ (function (_super) {
    tslib_1.__extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.renderCancelButton = function () {
        var _a = this.props, canCancel = _a.canCancel, onCancel = _a.onCancel;
        return (react_1.default.createElement(styled_1.CancelButton, { testId: "media-picker-cancel-button", appearance: "subtle", onClick: onCancel, isDisabled: !canCancel },
            react_1.default.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, media_ui_1.messages.cancel))));
    };
    Footer.prototype.renderInsertButton = function () {
        var _a = this.props, selectedItems = _a.selectedItems, canInsert = _a.canInsert, onInsert = _a.onInsert;
        var itemCount = selectedItems.length;
        if (itemCount === 0) {
            return null;
        }
        var onClick = function () { return onInsert(selectedItems); };
        return (react_1.default.createElement(styled_1.InsertButton, { testId: "media-picker-insert-button", appearance: "primary", onClick: onClick, isDisabled: !canInsert, autoFocus: true },
            react_1.default.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, media_ui_1.messages.insert_files, { values: {
                    0: itemCount,
                } }))));
    };
    Footer.prototype.render = function () {
        return (react_1.default.createElement(styled_1.Wrapper, null,
            this.renderInsertButton(),
            this.renderCancelButton()));
    };
    return Footer;
}(react_2.Component));
exports.Footer = Footer;
var mapStateToProps = function (_a) {
    var isUploading = _a.isUploading, isCancelling = _a.isCancelling, selectedItems = _a.selectedItems;
    var isUploadingOrCancelling = isUploading || isCancelling;
    return {
        selectedItems: selectedItems,
        canInsert: !isUploadingOrCancelling,
        canCancel: !isUploadingOrCancelling,
    };
};
var mapDispatchToProps = function (dispatch) { return ({
    onInsert: function () { return dispatch(actions_1.startImport()); },
    onCancel: function () {
        dispatch(actions_1.resetView());
        dispatch(actions_1.hidePopup());
    },
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Footer);
//# sourceMappingURL=footer.js.map