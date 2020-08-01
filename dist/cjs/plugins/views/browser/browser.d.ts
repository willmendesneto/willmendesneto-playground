import { JsonLd } from 'json-ld-types';
import { ForgeViewBaseProps } from '../../forge';
export declare type BrowserViewProps = ForgeViewBaseProps & {
    iconUrl: string;
    items: JsonLd.Collection;
    onFileClick(id: string): void;
    onFolderClick: (id: string) => void;
    onAuthSucceeded: () => void;
    onAuthFailed: (err: Error) => void;
};
export declare const BrowserView: ({ items, iconUrl, pluginName: name, onAuthSucceeded, onAuthFailed, onFileClick, onFolderClick, selectedItems, }: BrowserViewProps) => JSX.Element;
