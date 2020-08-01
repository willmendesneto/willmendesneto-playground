import { Component } from 'react';
import { ForgeViewBaseProps } from '../../forge';
export interface BrickItem {
    readonly id: string;
    readonly dimensions: {
        width: number;
        height: number;
    };
    readonly dataURI: string;
    readonly name?: string;
}
export declare type BricksViewProps = ForgeViewBaseProps & {
    items: BrickItem[];
    onFileClick(id: string): void;
};
export declare class BricksView extends Component<BricksViewProps, {}> {
    render(): JSX.Element;
    private renderLoading;
    private renderSearchResults;
    private renderMasonaryLayout;
    private createClickHandler;
}
