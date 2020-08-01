import { ForgeViewType } from '../types';
import { SelectedItem } from '../../../popup/domain';
import { JsonLd } from 'json-ld-types';
export interface ForgeViewMapperProps {
    view: ForgeViewType;
    items: JsonLd.Collection;
    iconUrl: string;
    selectedItems: SelectedItem[];
    onUpdateItems: () => void;
    onFileClick: (id: string) => void;
    onFolderClick: (id: string) => void;
    name: string;
}
export declare const ForgeViewMapper: ({ view, items, iconUrl, onUpdateItems, selectedItems, onFileClick, name, }: ForgeViewMapperProps) => JSX.Element | null;
