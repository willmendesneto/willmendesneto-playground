export const SEARCH_GIPHY = 'SEARCH_GIPHY';
export const SEARCH_GIPHY_FULFILLED = 'SEARCH_GIPHY_FULFILLED';
export const SEARCH_GIPHY_FAILED = 'SEARCH_GIPHY_FAILED';
export function isSearchGiphyAction(action) {
    return action.type === SEARCH_GIPHY;
}
export function searchGiphy(query, shouldAppendResults) {
    return {
        type: SEARCH_GIPHY,
        query,
        shouldAppendResults,
    };
}
export function isSearchGiphyFulfilledAction(action) {
    return action.type === SEARCH_GIPHY_FULFILLED;
}
export function searchGiphyFulfilled(imageCardModels, totalResultCount, shouldAppendResults) {
    return {
        type: SEARCH_GIPHY_FULFILLED,
        imageCardModels,
        totalResultCount,
        shouldAppendResults,
    };
}
export function isSearchGiphyFailedAction(action) {
    return action.type === SEARCH_GIPHY_FAILED;
}
export function searchGiphyFailed() {
    return {
        type: SEARCH_GIPHY_FAILED,
    };
}
//# sourceMappingURL=searchGiphy.js.map