import { isHidePopupAction } from '../actions/hidePopup';
export default (eventEmitter) => (_) => (next) => (action) => {
    if (isHidePopupAction(action)) {
        eventEmitter.emitClosed();
    }
    return next(action);
};
//# sourceMappingURL=hidePopup.js.map