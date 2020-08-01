"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DESELECT_ITEM = 'DESELECT_ITEM';
function isDeselectItemAction(action) {
    return action.type === exports.DESELECT_ITEM;
}
exports.isDeselectItemAction = isDeselectItemAction;
function deselectItem(fileId) {
    return {
        type: exports.DESELECT_ITEM,
        id: fileId,
    };
}
exports.deselectItem = deselectItem;
//# sourceMappingURL=deselectItem.js.map