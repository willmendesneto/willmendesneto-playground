export const GET_PREVIEW = 'GET_PREVIEW';
export function isGetPreviewAction(action) {
    return action.type === GET_PREVIEW;
}
export function getPreview(tenantFileId, file, collection) {
    return {
        type: GET_PREVIEW,
        fileId: tenantFileId,
        file,
        collection,
    };
}
//# sourceMappingURL=getPreview.js.map