import React from 'react';
import { BricksView } from '../../views/bricks';
import { BrowserView } from '../../views/browser/browser';
import { getResourceUrl } from '../../../plugins/extractors';
export const ForgeViewMapper = ({ view, items, iconUrl, onUpdateItems, selectedItems, onFileClick, name, }) => {
    const viewProps = {
        selectedItems,
        onFileClick,
        onFolderClick: onFileClick,
        pluginName: name,
    };
    if (view === 'bricks') {
        if (!items.data) {
            return null;
        }
        const brickItems = items.data.items.map(item => {
            const url = getResourceUrl(item.url) || '';
            const src = (item.image &&
                typeof item.image !== 'string' &&
                item.image['@type'] === 'Link' &&
                item.image.href) ||
                '';
            const width = (item.image &&
                typeof item.image !== 'string' &&
                item.image['@type'] === 'Link' &&
                item.image.width) ||
                0;
            const height = (item.image &&
                typeof item.image !== 'string' &&
                item.image['@type'] === 'Link' &&
                item.image.height) ||
                0;
            return {
                id: url,
                dimensions: { width, height },
                dataURI: src,
                name,
            };
        });
        return React.createElement(BricksView, Object.assign({ items: brickItems }, viewProps));
    }
    else if (view === 'folder') {
        return (React.createElement(BrowserView, Object.assign({ items: items, iconUrl: iconUrl, onAuthSucceeded: onUpdateItems, onAuthFailed: (err) => 
            // eslint-disable-next-line no-console
            console.error(err) }, viewProps)));
    }
    return null;
};
//# sourceMappingURL=mapper.js.map