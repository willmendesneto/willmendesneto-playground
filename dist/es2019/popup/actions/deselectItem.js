export const DESELECT_ITEM = 'DESELECT_ITEM';
export function isDeselectItemAction(action) {
    return action.type === DESELECT_ITEM;
}
export function deselectItem(fileId) {
    return {
        type: DESELECT_ITEM,
        id: fileId,
    };
}
//# sourceMappingURL=deselectItem.js.map