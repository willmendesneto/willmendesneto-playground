import { getImageUrl, getResourceUrl } from '../extractors';
export var getMetadata = function (id, resource) {
    if (resource['@type'] === 'Image') {
        return {
            id: id,
            metadata: {
                type: 'image',
                src: getImageUrl(resource),
                srcFull: getImageUrl(resource),
            },
        };
    }
    else {
        return {
            id: id,
            metadata: {
                type: 'link',
                src: getResourceUrl(resource.url),
            },
        };
    }
};
//# sourceMappingURL=utils.js.map