"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isImagePreview = function (preview) {
    return !!preview.dimensions;
};
exports.getPreviewFromMetadata = function (metadata) {
    // It could happen when the file type is not image. This is the way we communicate it to integrators
    if (!metadata.original ||
        !metadata.original.width ||
        !metadata.original.height) {
        return {};
    }
    var preview = {
        dimensions: {
            width: metadata.original.width,
            height: metadata.original.height,
        },
        scaleFactor: 1,
    };
    return preview;
};
//# sourceMappingURL=preview.js.map