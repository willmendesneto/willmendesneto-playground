"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var spinner_1 = tslib_1.__importDefault(require("@atlaskit/spinner"));
var styled_1 = require("../../views/styled");
exports.PluginLoadingView = function () { return (react_1.default.createElement(styled_1.SpinnerWrapper, null,
    react_1.default.createElement(spinner_1.default, { size: "medium" }))); };
//# sourceMappingURL=loading.js.map