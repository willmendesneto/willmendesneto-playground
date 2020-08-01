import React from 'react';
import { InjectedIntlProps } from 'react-intl';
export interface PluginHeaderProps {
    name: string;
    loading: boolean;
    error?: Error;
    totalImages?: number;
    onQueryChange: React.FormEventHandler<HTMLInputElement>;
    query?: string;
}
export declare const PluginHeader: React.ComponentClass<PluginHeaderProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<PluginHeaderProps & InjectedIntlProps>;
};
