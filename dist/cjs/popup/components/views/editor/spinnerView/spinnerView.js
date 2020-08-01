"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("react");
var spinner_1 = tslib_1.__importDefault(require("@atlaskit/spinner"));
var escHelper_1 = require("../escHelper");
var styles_1 = require("../styles");
var SpinnerView = /** @class */ (function (_super) {
    tslib_1.__extends(SpinnerView, _super);
    function SpinnerView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpinnerView.prototype.componentDidMount = function () {
        this.escHelper = new escHelper_1.EscHelper(this.props.onCancel);
    };
    SpinnerView.prototype.componentWillUnmount = function () {
        if (this.escHelper) {
            this.escHelper.teardown();
        }
    };
    SpinnerView.prototype.render = function () {
        return (react_1.default.createElement(styles_1.CenterView, null,
            react_1.default.createElement(spinner_1.default, { size: "large", appearance: "invert" })));
    };
    return SpinnerView;
}(react_2.Component));
exports.SpinnerView = SpinnerView;
//# sourceMappingURL=spinnerView.js.map