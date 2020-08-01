export const UPDATE_POPUP_URLS = 'UPDATE_POPUP_URLS';
export const updatePopupUrls = (urls) => {
    return {
        type: UPDATE_POPUP_URLS,
        urls,
    };
};
export function isUpdatePopupUrlsAction(action) {
    return action.type === UPDATE_POPUP_URLS;
}
//# sourceMappingURL=updatePopupUrls.js.map