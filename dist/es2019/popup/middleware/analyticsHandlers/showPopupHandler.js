import { SCREEN_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { isShowPopupAction } from '../../actions/showPopup';
export default (action) => {
    if (isShowPopupAction(action)) {
        return [
            {
                name: 'mediaPickerModal',
                eventType: SCREEN_EVENT_TYPE,
            },
            {
                name: 'recentFilesBrowserModal',
                eventType: SCREEN_EVENT_TYPE,
            },
        ];
    }
};
//# sourceMappingURL=showPopupHandler.js.map