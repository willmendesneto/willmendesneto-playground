import { __assign, __extends, __read, __spread } from "tslib";
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import DropboxIcon from '@atlaskit/icon/glyph/dropbox';
import GoogleDriveIcon from '@atlaskit/icon/glyph/googledrive';
import GiphySidebarItem from './item/giphySidebarItem';
import UploadIcon from '@atlaskit/icon/glyph/upload';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import SidebarItem from './item/sidebarItem';
import { Wrapper, ServiceList, Separator, SeparatorLine } from './styled';
var StatelessSidebar = /** @class */ (function (_super) {
    __extends(StatelessSidebar, _super);
    function StatelessSidebar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderBuiltInPlugins = function () {
            var _a = _this.props, selected = _a.selected, useForgePlugins = _a.useForgePlugins;
            if (useForgePlugins) {
                return [];
            }
            return [
                React.createElement(GiphySidebarItem, { key: "giphy", isActive: selected === 'giphy' }),
                React.createElement(SidebarItem, { key: "dropbox", serviceName: "dropbox", serviceFullName: "Dropbox", isActive: selected === 'dropbox' },
                    React.createElement(DropboxIcon, { label: "dropbox" })),
                React.createElement(SidebarItem, { key: "google", serviceName: "google", serviceFullName: "Google Drive", isActive: selected === 'google' },
                    React.createElement(GoogleDriveIcon, { label: "google" })),
            ];
        };
        _this.renderCustomPluginItems = function () {
            var _a = _this.props, selected = _a.selected, _b = _a.plugins, plugins = _b === void 0 ? [] : _b;
            return plugins.map(function (_a) {
                var name = _a.name, icon = _a.icon;
                return (React.createElement(SidebarItem, { key: name, serviceName: name, serviceFullName: name, isActive: selected === name }, icon));
            });
        };
        _this.getCloudPickingSidebarItems = function () {
            return __spread([
                React.createElement(Separator, { key: "seperator" },
                    React.createElement(SeparatorLine, null))
            ], _this.renderBuiltInPlugins(), _this.renderCustomPluginItems());
        };
        return _this;
    }
    StatelessSidebar.prototype.render = function () {
        var selected = this.props.selected;
        return (React.createElement(Wrapper, null,
            React.createElement(ServiceList, null,
                React.createElement(SidebarItem, { serviceName: "upload", serviceFullName: React.createElement(FormattedMessage, __assign({}, messages.upload)), isActive: selected === 'upload' },
                    React.createElement(UploadIcon, { label: "upload" })),
                this.getCloudPickingSidebarItems())));
    };
    return StatelessSidebar;
}(Component));
export { StatelessSidebar };
export default connect(function (state) { return ({
    selected: state.view.service.name,
    plugins: state.plugins,
}); })(StatelessSidebar);
//# sourceMappingURL=sidebar.js.map