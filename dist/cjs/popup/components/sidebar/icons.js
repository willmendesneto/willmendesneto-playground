"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("react");
var styled_1 = require("./styled");
// TODO this file should be replaced with ak/icons icon MSW-404
var GiphyIcon = /** @class */ (function (_super) {
    tslib_1.__extends(GiphyIcon, _super);
    function GiphyIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GiphyIcon.prototype.render = function () {
        var active = this.props.active;
        return (react_1.default.createElement(styled_1.StyledIcon, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 27 35" },
            react_1.default.createElement(styled_1.StyledSvgGroup, { active: active, "fill-rule": "evenodd", "clip-rule": "evenodd" },
                react_1.default.createElement("path", { className: "logo-green", d: "M0 3h4v29H0z" }),
                react_1.default.createElement("path", { className: "logo-purple", d: "M24 11h4v21h-4z" }),
                react_1.default.createElement("path", { className: "logo-blue", d: "M0 31h28v4H0z" }),
                react_1.default.createElement("path", { className: "logo-yellow", d: "M0 0h16v4H0z" }),
                react_1.default.createElement("path", { className: "logo-red", d: "M24 8V4h-4V0h-4v12h12V8" }),
                react_1.default.createElement("path", { className: "logo-shadow", d: "M24 16v-4h4M16 0v4h-4" }))));
    };
    return GiphyIcon;
}(react_2.Component));
exports.GiphyIcon = GiphyIcon;
//# sourceMappingURL=icons.js.map