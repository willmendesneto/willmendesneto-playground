/// <reference types="react-redux" />
import { Component } from 'react';
import { InjectedIntlProps } from 'react-intl';
import { Path, ServiceName, ServiceAccountWithType, ServiceAccountLink } from '../../domain';
export interface NavigationStateProps {
    readonly accounts: Promise<ServiceAccountWithType[]>;
    readonly path: Path;
    readonly service: ServiceAccountLink;
}
export interface NavigationDispatchProps {
    readonly onChangeAccount: (serviceName: ServiceName, accountId: string) => void;
    readonly onChangePath: (serviceName: ServiceName, accountId: string, path: Path) => void;
    readonly onStartAuth: (serviceName: ServiceName) => void;
    readonly onUnlinkAccount: (serviceName: ServiceName, accountId: string) => void;
}
export declare type NavigationProps = NavigationStateProps & NavigationDispatchProps & InjectedIntlProps;
export interface NavigationState {
    readonly dropdownOpen: boolean;
    readonly availableAccounts: ServiceAccountWithType[];
}
export declare class Navigation extends Component<NavigationProps, NavigationState> {
    state: NavigationState;
    private mounted;
    componentWillUnmount(): void;
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: NavigationProps): Promise<void>;
    render(): JSX.Element;
    onRefreshButtonClick: () => void;
    getAccountButton(): JSX.Element;
    onChangeAccountHandler: (type: string, id: string) => () => void;
    onUnlinkAccountHandler: (name: string, accountId: string) => () => void;
    onStartAuthHandler: (name: string) => () => void;
    getAccountsDropdownItems(): JSX.Element[];
    getAccountsDropdown(): JSX.Element;
    private handleOpenChange;
    private generateBreadcrumbs;
    private renderBreadcrumb;
}
declare const _default;
export default _default;
