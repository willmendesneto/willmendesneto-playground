import { isHidePopupAction } from '../actions/hidePopup';
export default function (state, action) {
    if (isHidePopupAction(action)) {
        return {
            ...state,
            view: {
                ...state.view,
                isVisible: false,
            },
        };
    }
    else {
        return state;
    }
}
//# sourceMappingURL=hidePopup.js.map