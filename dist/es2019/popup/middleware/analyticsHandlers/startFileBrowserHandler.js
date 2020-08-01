import { SCREEN_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { buttonClickPayload } from '.';
import { isStartFileBrowserAction } from '../../actions/startFileBrowser';
export default (action) => {
    if (isStartFileBrowserAction(action)) {
        return [
            {
                name: 'localFileBrowserModal',
                eventType: SCREEN_EVENT_TYPE,
            },
            {
                ...buttonClickPayload,
                actionSubjectId: 'localFileBrowserButton',
            },
        ];
    }
};
//# sourceMappingURL=startFileBrowserHandler.js.map