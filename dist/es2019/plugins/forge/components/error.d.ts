export interface PluginErrorViewProps {
    error: Error;
    onRetry: () => void;
}
export declare const PluginErrorView: ({ onRetry }: PluginErrorViewProps) => JSX.Element;
