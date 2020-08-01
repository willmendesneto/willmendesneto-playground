import React from 'react';
import { BrowserConfig } from '../../types';
import { LocalUploadComponentReact, LocalUploadComponentBaseProps } from '../localUploadReact';
export interface BrowserOwnProps {
    config: BrowserConfig;
    isOpen?: boolean;
    onClose?: () => void;
    /**
     * This prop will be mainly used for those contexts (like Editor) where there is no react lifecylce and we cannot rerender easily.
     * Otherwise, isOpen prop is preferred.
     */
    onBrowseFn?: (browse: () => void) => void;
    onCancelFn?: (cancel: (uniqueIdentifier: string) => void) => void;
}
export declare type BrowserProps = LocalUploadComponentBaseProps & BrowserOwnProps;
export declare class BrowserBase extends LocalUploadComponentReact<BrowserProps> {
    private browserRef;
    static defaultProps: {
        config: BrowserConfig;
    };
    private onFilePicked;
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: BrowserProps): void;
    browse: () => void;
    render(): JSX.Element;
}
export declare const Browser: React.ForwardRefExoticComponent<Pick<Pick<Pick<BrowserProps, "onError" | "mediaClient" | "config" | "onUploadsStart" | "onPreviewUpdate" | "onEnd" | "isOpen" | "onClose" | "onBrowseFn" | "onCancelFn">, "onError" | "mediaClient" | "onUploadsStart" | "onPreviewUpdate" | "onEnd" | "isOpen" | "onClose" | "onBrowseFn" | "onCancelFn"> & Partial<Pick<Pick<BrowserProps, "onError" | "mediaClient" | "config" | "onUploadsStart" | "onPreviewUpdate" | "onEnd" | "isOpen" | "onClose" | "onBrowseFn" | "onCancelFn">, "config">> & Partial<Pick<{
    config: BrowserConfig;
}, never>> & React.RefAttributes<any> & import("@atlaskit/analytics-next/dist/cjs/withAnalyticsContext").WithContextProps, "key" | "onError" | "analyticsContext" | "mediaClient" | "config" | "onUploadsStart" | "onPreviewUpdate" | "onEnd" | "isOpen" | "onClose" | "onBrowseFn" | "onCancelFn"> & React.RefAttributes<any>>;
