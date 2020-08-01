import React from 'react';
import { getForgePluginsFullfilled, getForgePluginsFailed } from '../actions';
import { isGetForgePluginsAction } from '../actions/getForgePlugins';
import { ForgeView, ForgeIcon, ForgeClient, } from '../../plugins/forge';
export const getForgePlugins = () => (store) => (next) => (action) => {
    if (isGetForgePluginsAction(action)) {
        requestForgePlugins(store);
    }
    return next(action);
};
export const requestForgePlugins = async (store) => {
    const client = new ForgeClient();
    const { dispatch } = store;
    try {
        const { providers } = await client.getProviders();
        const availableProviders = providers.filter(provider => !!provider.metadata.supportedViews.length);
        const pluginsForMediaPicker = availableProviders
            .map(transformForgeProviderToPlugin)
            .sort((b, a) => b.name.localeCompare(a.name));
        dispatch(getForgePluginsFullfilled(pluginsForMediaPicker));
    }
    catch (e) {
        dispatch(getForgePluginsFailed());
    }
};
export const transformForgeProviderToPlugin = (provider) => ({
    name: provider.metadata.name,
    icon: React.createElement(ForgeIcon, { iconUrl: provider.metadata.avatarUrl }),
    render: (actions, selectedItems) => {
        return (React.createElement(ForgeView, { key: provider.key, actions: actions, selectedItems: selectedItems, extensionOpts: {
                id: provider.key,
                name: provider.metadata.name,
                view: provider.metadata.supportedViews[0],
                iconUrl: provider.metadata.avatarUrl,
            } }));
    },
});
//# sourceMappingURL=getForgePlugins.js.map