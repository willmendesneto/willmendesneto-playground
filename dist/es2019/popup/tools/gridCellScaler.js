export default ({ width, height, containerWidth, gapSize, numberOfColumns, }) => {
    const desiredWith = Math.floor((containerWidth - gapSize * (numberOfColumns - 1)) / numberOfColumns);
    return {
        width: desiredWith,
        height: Math.round((desiredWith / width) * height),
    };
};
//# sourceMappingURL=gridCellScaler.js.map