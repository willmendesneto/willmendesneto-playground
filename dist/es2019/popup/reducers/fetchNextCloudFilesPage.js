import { isFetchNextCloudFilesPageAction } from '../actions/fetchNextCloudFilesPage';
export default function fetchNextPage(state, action) {
    if (isFetchNextCloudFilesPageAction(action)) {
        return {
            ...state,
            view: {
                ...state.view,
                isLoading: true,
                currentCursor: action.nextCursor,
                nextCursor: undefined,
            },
        };
    }
    else {
        return state;
    }
}
//# sourceMappingURL=fetchNextCloudFilesPage.js.map