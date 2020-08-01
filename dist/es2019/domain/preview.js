export const isImagePreview = (preview) => !!preview.dimensions;
export const getPreviewFromMetadata = (metadata) => {
    // It could happen when the file type is not image. This is the way we communicate it to integrators
    if (!metadata.original ||
        !metadata.original.width ||
        !metadata.original.height) {
        return {};
    }
    const preview = {
        dimensions: {
            width: metadata.original.width,
            height: metadata.original.height,
        },
        scaleFactor: 1,
    };
    return preview;
};
//# sourceMappingURL=preview.js.map