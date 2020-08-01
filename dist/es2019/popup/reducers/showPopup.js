import { isShowPopupAction } from '../actions/showPopup';
export default function (state, action) {
    if (isShowPopupAction(action)) {
        return {
            ...state,
            view: {
                ...state.view,
                isVisible: true,
            },
        };
    }
    else {
        return state;
    }
}
//# sourceMappingURL=showPopup.js.map