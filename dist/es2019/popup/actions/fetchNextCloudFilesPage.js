const FETCH_NEXT_CLOUD_FILES_PAGE = 'FETCH_NEXT_CLOUD_FILES_PAGE';
export function fetchNextCloudFilesPage(serviceName, accountId, path, nextCursor) {
    return {
        type: FETCH_NEXT_CLOUD_FILES_PAGE,
        serviceName,
        accountId,
        path,
        nextCursor,
    };
}
export function isFetchNextCloudFilesPageAction(action) {
    return action.type === FETCH_NEXT_CLOUD_FILES_PAGE;
}
//# sourceMappingURL=fetchNextCloudFilesPage.js.map