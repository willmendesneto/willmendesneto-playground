"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extractors_1 = require("../extractors");
exports.getMetadata = function (id, resource) {
    if (resource['@type'] === 'Image') {
        return {
            id: id,
            metadata: {
                type: 'image',
                src: extractors_1.getImageUrl(resource),
                srcFull: extractors_1.getImageUrl(resource),
            },
        };
    }
    else {
        return {
            id: id,
            metadata: {
                type: 'link',
                src: extractors_1.getResourceUrl(resource.url),
            },
        };
    }
};
//# sourceMappingURL=utils.js.map