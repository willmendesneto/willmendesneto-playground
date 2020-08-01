import { JsonLd } from 'json-ld-types';
export interface FileProps {
    isSelected: boolean;
    file: JsonLd.Data.Document;
    icon: JSX.Element;
    onClick: (id: string) => void;
}
export declare const fileSelected: JSX.Element;
export declare const File: ({ isSelected, file, icon, onClick }: FileProps) => JSX.Element;
