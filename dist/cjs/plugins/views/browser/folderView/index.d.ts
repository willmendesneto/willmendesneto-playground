import { JsonLd } from 'json-ld-types';
import { SelectedItem } from '../../../../popup/domain';
export interface FolderViewerProps {
    items: JsonLd.Collection;
    selectedItems: SelectedItem[];
    onFolderClick: (id: string) => void;
    onFileClick: (id: string) => void;
}
export declare const FolderViewer: ({ items: { data }, selectedItems, onFolderClick, onFileClick, }: FolderViewerProps) => JSX.Element | null;
