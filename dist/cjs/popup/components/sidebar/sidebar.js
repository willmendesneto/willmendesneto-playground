"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("react");
var react_redux_1 = require("react-redux");
var dropbox_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/dropbox"));
var googledrive_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/googledrive"));
var giphySidebarItem_1 = tslib_1.__importDefault(require("./item/giphySidebarItem"));
var upload_1 = tslib_1.__importDefault(require("@atlaskit/icon/glyph/upload"));
var react_intl_1 = require("react-intl");
var media_ui_1 = require("@atlaskit/media-ui");
var sidebarItem_1 = tslib_1.__importDefault(require("./item/sidebarItem"));
var styled_1 = require("./styled");
var StatelessSidebar = /** @class */ (function (_super) {
    tslib_1.__extends(StatelessSidebar, _super);
    function StatelessSidebar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderBuiltInPlugins = function () {
            var _a = _this.props, selected = _a.selected, useForgePlugins = _a.useForgePlugins;
            if (useForgePlugins) {
                return [];
            }
            return [
                react_1.default.createElement(giphySidebarItem_1.default, { key: "giphy", isActive: selected === 'giphy' }),
                react_1.default.createElement(sidebarItem_1.default, { key: "dropbox", serviceName: "dropbox", serviceFullName: "Dropbox", isActive: selected === 'dropbox' },
                    react_1.default.createElement(dropbox_1.default, { label: "dropbox" })),
                react_1.default.createElement(sidebarItem_1.default, { key: "google", serviceName: "google", serviceFullName: "Google Drive", isActive: selected === 'google' },
                    react_1.default.createElement(googledrive_1.default, { label: "google" })),
            ];
        };
        _this.renderCustomPluginItems = function () {
            var _a = _this.props, selected = _a.selected, _b = _a.plugins, plugins = _b === void 0 ? [] : _b;
            return plugins.map(function (_a) {
                var name = _a.name, icon = _a.icon;
                return (react_1.default.createElement(sidebarItem_1.default, { key: name, serviceName: name, serviceFullName: name, isActive: selected === name }, icon));
            });
        };
        _this.getCloudPickingSidebarItems = function () {
            return tslib_1.__spread([
                react_1.default.createElement(styled_1.Separator, { key: "seperator" },
                    react_1.default.createElement(styled_1.SeparatorLine, null))
            ], _this.renderBuiltInPlugins(), _this.renderCustomPluginItems());
        };
        return _this;
    }
    StatelessSidebar.prototype.render = function () {
        var selected = this.props.selected;
        return (react_1.default.createElement(styled_1.Wrapper, null,
            react_1.default.createElement(styled_1.ServiceList, null,
                react_1.default.createElement(sidebarItem_1.default, { serviceName: "upload", serviceFullName: react_1.default.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, media_ui_1.messages.upload)), isActive: selected === 'upload' },
                    react_1.default.createElement(upload_1.default, { label: "upload" })),
                this.getCloudPickingSidebarItems())));
    };
    return StatelessSidebar;
}(react_2.Component));
exports.StatelessSidebar = StatelessSidebar;
exports.default = react_redux_1.connect(function (state) { return ({
    selected: state.view.service.name,
    plugins: state.plugins,
}); })(StatelessSidebar);
//# sourceMappingURL=sidebar.js.map