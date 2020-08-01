import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import DropdownMenu, { DropdownItemGroup, DropdownItem, } from '@atlaskit/dropdown-menu';
import RefreshIcon from '@atlaskit/icon/glyph/refresh';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import { startAuth } from '../../actions/startAuth';
import { requestUnlinkCloudAccount } from '../../actions/unlinkCloudAccount';
import { changeCloudAccountFolder } from '../../actions/changeCloudAccountFolder';
import { changeAccount } from '../../actions/changeAccount';
import { FolderViewerNavigation, ControlsWrapper, Controls, ControlButton, BreadCrumbs, BreadCrumbLink, BreadCrumbLinkLabel, BreadCrumbLinkSeparator, AccountItemButton, AccountDropdownWrapper, } from './styled';
const SERVICENAME = {
    dropbox: 'Dropbox',
    google: 'Google Drive',
};
export class Navigation extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            dropdownOpen: false,
            availableAccounts: [],
        };
        this.mounted = false;
        this.onRefreshButtonClick = () => {
            const { service, path, onChangePath } = this.props;
            onChangePath(service.name, service.accountId, path);
        };
        this.onChangeAccountHandler = (type, id) => () => {
            const { onChangeAccount } = this.props;
            onChangeAccount(type, id);
        };
        this.onUnlinkAccountHandler = (name, accountId) => () => {
            const { onUnlinkAccount } = this.props;
            onUnlinkAccount(name, accountId);
        };
        this.onStartAuthHandler = (name) => () => {
            const { onStartAuth } = this.props;
            onStartAuth(name);
        };
        this.handleOpenChange = (attrs) => {
            this.setState({ dropdownOpen: attrs.isOpen });
        };
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    async componentDidMount() {
        this.mounted = true;
        const { accounts, service } = this.props;
        const availableAccounts = (await accounts).filter(account => account.type === service.name);
        if (this.mounted) {
            this.setState({
                availableAccounts,
            });
        }
    }
    async componentDidUpdate(prevProps) {
        const { accounts, service } = this.props;
        if (prevProps.service !== service) {
            const availableAccounts = (await accounts).filter(account => account.type === service.name);
            if (this.mounted) {
                this.setState({
                    availableAccounts,
                });
            }
        }
    }
    render() {
        const { service, path } = this.props;
        const breadcrumbs = this.generateBreadcrumbs(service, path);
        const accountsDropdown = this.getAccountsDropdown();
        return (React.createElement(FolderViewerNavigation, null,
            breadcrumbs,
            React.createElement(ControlsWrapper, null,
                React.createElement(Controls, null,
                    React.createElement(ControlButton, { onClick: this.onRefreshButtonClick, iconBefore: React.createElement(RefreshIcon, { label: "refresh" }) }),
                    accountsDropdown))));
    }
    getAccountButton() {
        const { dropdownOpen } = this.state;
        return (React.createElement(AccountItemButton, { isSelected: dropdownOpen, iconBefore: React.createElement(SettingsIcon, { label: "account settings" }) }));
    }
    getAccountsDropdownItems() {
        const { service, intl: { formatMessage }, } = this.props;
        const { availableAccounts } = this.state;
        const dropdownAccountItems = availableAccounts.map(({ id, displayName, type }) => (React.createElement(DropdownItem, { key: id, onClick: this.onChangeAccountHandler(type, id) }, id === service.accountId ? React.createElement("b", null, displayName) : displayName)));
        const dropdownActionItems = [
            React.createElement(DropdownItem, { key: "add", onClick: this.onStartAuthHandler(service.name) },
                React.createElement(FormattedMessage, Object.assign({}, messages.add_account))),
            React.createElement(DropdownItem, { key: "unlink", onClick: this.onUnlinkAccountHandler(service.name, service.accountId) },
                React.createElement(FormattedMessage, Object.assign({}, messages.unlink_account))),
        ];
        return [
            React.createElement(DropdownItemGroup, { key: "accounts", title: formatMessage(messages.accounts) }, dropdownAccountItems),
            React.createElement(DropdownItemGroup, { key: "actions", title: formatMessage(messages.actions) }, dropdownActionItems),
        ];
    }
    getAccountsDropdown() {
        const items = this.getAccountsDropdownItems();
        return (React.createElement(AccountDropdownWrapper, null,
            React.createElement(DropdownMenu, { onOpenChange: this.handleOpenChange, trigger: this.getAccountButton(), position: "bottom right" }, items)));
    }
    generateBreadcrumbs(service, path) {
        const serviceName = SERVICENAME[service.name] || service.name;
        const fullPath = [{ id: '', name: serviceName }].concat(path);
        const breadcrumbs = fullPath
            .slice(-2)
            .map(folderReference => {
            const index = fullPath.indexOf(folderReference);
            return fullPath.slice(0, index + 1);
        })
            .map((path, index, allPaths) => {
            const isLast = index === allPaths.length - 1;
            return this.renderBreadcrumb(service, path, isLast);
        });
        return React.createElement(BreadCrumbs, null, breadcrumbs);
    }
    renderBreadcrumb(service, path, isLast) {
        const { onChangePath } = this.props;
        if (path.length === 0) {
            return null;
        }
        const folder = path[path.length - 1];
        const onClick = () => onChangePath(service.name, service.accountId, path.slice(1));
        return (React.createElement(BreadCrumbLink, { key: folder.id, onClick: onClick, isLast: isLast },
            React.createElement(BreadCrumbLinkLabel, { title: folder.name, isLast: isLast }, folder.name),
            React.createElement(BreadCrumbLinkSeparator, { isLast: isLast }, "/")));
    }
}
export default connect(({ accounts, view }) => ({
    accounts,
    path: view.path,
    service: view.service,
}), dispatch => ({
    onChangeAccount: (serviceName, accountId) => dispatch(changeAccount(serviceName, accountId)),
    onChangePath: (serviceName, accountId, path) => dispatch(changeCloudAccountFolder(serviceName, accountId, [...path])),
    onStartAuth: serviceName => dispatch(startAuth(serviceName)),
    onUnlinkAccount: (serviceName, accountId) => dispatch(requestUnlinkCloudAccount({
        id: accountId,
        name: serviceName,
    })),
}))(injectIntl(Navigation));
//# sourceMappingURL=navigation.js.map