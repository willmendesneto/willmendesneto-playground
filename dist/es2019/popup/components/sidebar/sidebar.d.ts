/// <reference types="react-redux" />
import { Component } from 'react';
import { MediaPickerPlugin } from '../../../domain/plugin';
export interface SidebarStateProps {
    readonly selected: string;
    readonly plugins?: MediaPickerPlugin[];
}
interface SidebarOwnProps {
    readonly useForgePlugins?: boolean;
}
export declare type SidebarProps = SidebarStateProps & SidebarOwnProps;
export declare class StatelessSidebar extends Component<SidebarProps> {
    render(): JSX.Element;
    private renderBuiltInPlugins;
    private renderCustomPluginItems;
    private getCloudPickingSidebarItems;
}
declare const _default;
export default _default;
