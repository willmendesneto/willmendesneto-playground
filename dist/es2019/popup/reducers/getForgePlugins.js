import { isGetForgePluginsFullfilledAction, isGetForgePluginsFailedAction, } from '../actions/getForgePlugins';
export const getForgePluginsStarted = (state, action) => {
    return state;
};
export const getForgePluginsFullfilled = (state, action) => {
    if (isGetForgePluginsFullfilledAction(action)) {
        const { items } = action;
        return {
            ...state,
            plugins: mergePlugins(state.plugins, items),
        };
    }
    return state;
};
const mergePlugins = (currentPlugins, incomingPlugins) => {
    if (currentPlugins && currentPlugins.length > 0) {
        const newPlugins = incomingPlugins.filter(incomingPlugin => !currentPlugins.some(currentPlugin => currentPlugin.name === incomingPlugin.name));
        return currentPlugins.concat(newPlugins);
    }
    else {
        return incomingPlugins;
    }
};
export const getForgePluginsFailed = (state, action) => {
    if (isGetForgePluginsFailedAction(action)) {
        return {
            ...state,
            view: {
                ...state.view,
                hasError: true,
                isLoading: false,
            },
        };
    }
    return state;
};
//# sourceMappingURL=getForgePlugins.js.map