/// <reference types="react-redux" />
import { Component } from 'react';
import { ServiceAccountLink } from '../../../domain';
export interface BrowserStateProps {
    readonly service: ServiceAccountLink;
    readonly hasError: boolean;
}
export interface BrowserDispatchProps {
    reloadService: (service: ServiceAccountLink) => void;
}
export declare type BrowserProps = BrowserStateProps & BrowserDispatchProps;
export declare class Browser extends Component<BrowserProps> {
    render(): JSX.Element;
    private renderError;
    private reloadService;
}
declare const _default;
export default _default;
