import { JsonLd } from 'json-ld-types';
export interface FolderProps {
    folder: JsonLd.Data.Document;
    icon: JSX.Element;
    onClick: (id: string) => void;
}
export declare const Folder: ({ folder, icon, onClick }: FolderProps) => JSX.Element;
