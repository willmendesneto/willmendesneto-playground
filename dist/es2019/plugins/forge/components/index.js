import React from 'react';
import { useEffect, useState, useMemo, useCallback } from 'react';
import * as debounce from 'lodash.debounce';
import { JsonLdCollectionEmpty } from '../types';
import { ForgeClient } from '../client';
import { ForgeViewMapper } from './mapper';
import { PluginHeader } from './header';
import { PluginWrapper, PluginContentContainer as PluginContentView, } from './styled';
import { PluginLoadingView } from './loading';
import { PluginErrorView } from './error';
import { getMetadata } from '../utils';
export const ForgeView = ({ extensionOpts: { name, id, view, iconUrl }, actions, selectedItems, }) => {
    const client = useMemo(() => new ForgeClient(), []);
    const [loading, setLoading] = useState(true);
    const [contextId, setContextId] = useState('');
    const [query, setQuery] = useState();
    const [error, setError] = useState();
    const [items, setItems] = useState(JsonLdCollectionEmpty);
    const onUpdateItems = useCallback(debounce(async (query, folderId) => {
        try {
            setError(undefined);
            setLoading(true);
            const newItems = await client.invokeProvider(id, {
                query,
                folderId: folderId || contextId,
            });
            setItems(newItems);
        }
        catch (err) {
            setError(err);
        }
        finally {
            setLoading(false);
        }
    }, 1000), [name, contextId]);
    const onQueryChange = useCallback(event => {
        setQuery(event.currentTarget.value);
        onUpdateItems(query);
    }, [onUpdateItems, query]);
    const onClick = useCallback((id) => () => {
        const resource = items.data && [...items.data.items].find(item => item.url === id);
        if (resource) {
            if (resource['@type'] === 'Collection') {
                const id = resource['@id'] || '';
                setContextId(id);
                onUpdateItems(query, id);
            }
            else {
                const metadata = getMetadata(id, resource);
                actions.fileClick(metadata, name);
            }
        }
    }, [items.data, onUpdateItems, query, actions, name]);
    const onFileClick = useCallback((id) => onClick(id)(), [onClick]);
    useEffect(() => {
        onUpdateItems(query);
    }, [onUpdateItems, query, id]);
    return (React.createElement(PluginWrapper, null,
        React.createElement(PluginHeader, { name: name, loading: loading, error: error, totalImages: items.data && items.data.items && [...items.data.items].length, onQueryChange: onQueryChange, query: query }),
        loading ? (React.createElement(PluginLoadingView, null)) : error ? (React.createElement(PluginErrorView, { error: error, onRetry: onUpdateItems })) : (React.createElement(PluginContentView, null,
            React.createElement(ForgeViewMapper, { view: view, items: items, iconUrl: iconUrl, selectedItems: selectedItems, onUpdateItems: onUpdateItems, onFileClick: onFileClick, onFolderClick: onFileClick, name: name })))));
};
export { ForgeIcon } from './icon';
//# sourceMappingURL=index.js.map