import { isSearchGiphyAction, searchGiphyFulfilled, searchGiphyFailed, } from '../actions/searchGiphy';
export default (fetcher) => (store) => (next) => (action) => {
    if (isSearchGiphyAction(action)) {
        const { query, shouldAppendResults } = action;
        const { imageCardModels } = store.getState().giphy;
        const offset = shouldAppendResults ? imageCardModels.length + 1 : undefined;
        fetchGifs(fetcher, store, { query, offset, shouldAppendResults });
    }
    return next(action);
};
export const fetchGifs = async (fetcher, store, params) => {
    const { query, offset, shouldAppendResults } = params;
    try {
        const { cardModels, totalResultCount } = query.length > 0
            ? await fetcher.fetchGifsRelevantToSearch(query, offset)
            : await fetcher.fetchTrendingGifs(offset);
        store.dispatch(searchGiphyFulfilled(cardModels, totalResultCount, shouldAppendResults));
    }
    catch (e) {
        store.dispatch(searchGiphyFailed());
    }
};
//# sourceMappingURL=searchGiphy.js.map