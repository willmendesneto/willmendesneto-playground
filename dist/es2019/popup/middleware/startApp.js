import { isStartAppAction } from '../actions/startApp';
import { updatePopupUrls } from '../actions/updatePopupUrls';
export default function () {
    return (store) => (next) => (action) => {
        if (isStartAppAction(action)) {
            const { redirectUrl } = store.getState();
            store.dispatch(updatePopupUrls({ redirectUrl }));
        }
        return next(action);
    };
}
//# sourceMappingURL=startApp.js.map