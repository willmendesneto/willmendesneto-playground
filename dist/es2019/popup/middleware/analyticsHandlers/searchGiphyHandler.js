import { SCREEN_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { isSearchGiphyAction } from '../../actions/searchGiphy';
export default (action) => {
    if (isSearchGiphyAction(action)) {
        return [
            {
                name: 'cloudBrowserModal',
                eventType: SCREEN_EVENT_TYPE,
                attributes: {
                    cloudType: 'giphy',
                },
            },
        ];
    }
};
//# sourceMappingURL=searchGiphyHandler.js.map