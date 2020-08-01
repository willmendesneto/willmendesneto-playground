"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var image_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/image"));
var styled_1 = require("./styled");
exports.ForgeIcon = function (props) {
    if (props.iconUrl) {
        return react_1.default.createElement(styled_1.PluginIcon, { src: props.iconUrl });
    }
    else {
        return react_1.default.createElement(image_1.default, { label: "image-icon" });
    }
};
//# sourceMappingURL=icon.js.map