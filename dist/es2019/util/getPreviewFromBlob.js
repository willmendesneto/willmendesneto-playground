import VideoSnapshot from 'video-snapshot';
export const getPreviewFromBlob = (file, mediaType) => new Promise(async (resolve, reject) => {
    const src = URL.createObjectURL(file);
    if (mediaType === 'image') {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            const dimensions = { width: img.width, height: img.height };
            const preview = {
                file,
                dimensions,
                scaleFactor: 1,
            };
            URL.revokeObjectURL(src);
            resolve(preview);
        };
        img.onerror = reject;
    }
    else if (mediaType === 'video') {
        const snapshoter = new VideoSnapshot(file);
        const dimensions = await snapshoter.getDimensions();
        const preview = {
            file,
            dimensions,
            scaleFactor: 1,
        };
        snapshoter.end();
        resolve(preview);
    }
    else {
        resolve({ file });
    }
});
//# sourceMappingURL=getPreviewFromBlob.js.map