import { isUpdatePopupUrlsAction } from '../actions/updatePopupUrls';
export default function updatePopupUrls(state, action) {
    if (isUpdatePopupUrlsAction(action)) {
        const { urls } = action;
        return {
            ...state,
            ...urls,
        };
    }
    return state;
}
//# sourceMappingURL=updatePopupUrls.js.map