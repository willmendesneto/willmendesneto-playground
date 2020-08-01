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
export class StatelessSidebar extends Component {
    constructor() {
        super(...arguments);
        this.renderBuiltInPlugins = () => {
            const { selected, useForgePlugins } = this.props;
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
        this.renderCustomPluginItems = () => {
            const { selected, plugins = [] } = this.props;
            return plugins.map(({ name, icon }) => {
                return (React.createElement(SidebarItem, { key: name, serviceName: name, serviceFullName: name, isActive: selected === name }, icon));
            });
        };
        this.getCloudPickingSidebarItems = () => {
            return [
                React.createElement(Separator, { key: "seperator" },
                    React.createElement(SeparatorLine, null)),
                ...this.renderBuiltInPlugins(),
                ...this.renderCustomPluginItems(),
            ];
        };
    }
    render() {
        const { selected } = this.props;
        return (React.createElement(Wrapper, null,
            React.createElement(ServiceList, null,
                React.createElement(SidebarItem, { serviceName: "upload", serviceFullName: React.createElement(FormattedMessage, Object.assign({}, messages.upload)), isActive: selected === 'upload' },
                    React.createElement(UploadIcon, { label: "upload" })),
                this.getCloudPickingSidebarItems())));
    }
}
export default connect(state => ({
    selected: state.view.service.name,
    plugins: state.plugins,
}))(StatelessSidebar);
//# sourceMappingURL=sidebar.js.map