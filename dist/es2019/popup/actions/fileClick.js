export const FILE_CLICK = 'FILE_CLICK';
export function isFileClickAction(action) {
    return action.type === FILE_CLICK;
}
export function fileClick(file, serviceName, accountId) {
    return {
        type: FILE_CLICK,
        file: {
            ...file,
            accountId,
            serviceName,
        },
    };
}
//# sourceMappingURL=fileClick.js.map