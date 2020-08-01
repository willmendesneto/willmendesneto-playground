import { getImageUrl, getResourceUrl } from '../extractors';
export const getMetadata = (id, resource) => {
    if (resource['@type'] === 'Image') {
        return {
            id,
            metadata: {
                type: 'image',
                src: getImageUrl(resource),
                srcFull: getImageUrl(resource),
            },
        };
    }
    else {
        return {
            id,
            metadata: {
                type: 'link',
                src: getResourceUrl(resource.url),
            },
        };
    }
};
//# sourceMappingURL=utils.js.map