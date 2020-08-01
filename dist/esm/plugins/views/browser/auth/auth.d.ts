import { JsonLd } from 'json-ld-types';
export interface BrowserAuthViewProps {
    name: string;
    iconUrl: string;
    auth: JsonLd.Primitives.AuthService[];
    onAuthSucceeded: () => void;
    onAuthFailed: (err: Error) => void;
}
export declare const BrowserAuthView: ({ iconUrl, auth: services, name, onAuthSucceeded, onAuthFailed, }: BrowserAuthViewProps) => JSX.Element;
