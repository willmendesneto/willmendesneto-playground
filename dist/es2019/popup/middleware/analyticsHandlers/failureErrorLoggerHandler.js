import { OPERATIONAL_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { isFailureErrorAction } from '../../actions/failureErrorLogger';
export default (action) => {
    if (isFailureErrorAction(action)) {
        const { error, info = undefined } = action;
        return [
            {
                name: 'UnhandledError',
                action: 'UnhandledError',
                eventType: OPERATIONAL_EVENT_TYPE,
                attributes: {
                    browserInfo: !!(window &&
                        window.navigator &&
                        window.navigator.userAgent)
                        ? window.navigator.userAgent
                        : 'unknown',
                    error,
                    info,
                },
            },
        ];
    }
};
//# sourceMappingURL=failureErrorLoggerHandler.js.map