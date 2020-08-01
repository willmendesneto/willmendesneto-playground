import { UIAnalyticsEvent, } from '@atlaskit/analytics-next';
import { version, name } from '../../version.json';
import analyticsActionHandlers from './analyticsHandlers';
import { ANALYTICS_MEDIA_CHANNEL } from '../../components/media-picker-analytics-error-boundary';
const getMediaRegion = () => {
    return (window &&
        window.sessionStorage &&
        window.sessionStorage.getItem('media-api-region'));
};
// TODO https://product-fabric.atlassian.net/browse/MS-598
const createAndFire = (payload, handlers) => {
    const mediaRegion = getMediaRegion();
    new UIAnalyticsEvent({
        context: [{}],
        handlers,
        payload: {
            ...payload,
            attributes: {
                ...payload.attributes,
                componentName: 'mediaPicker',
                packageName: name,
                componentVersion: version,
                ...(mediaRegion ? { mediaRegion } : undefined),
            },
        },
    }).fire(ANALYTICS_MEDIA_CHANNEL);
};
export default (store) => (next) => (action) => {
    const proxyReactContext = store.getState().config.proxyReactContext;
    if (proxyReactContext &&
        proxyReactContext.getAtlaskitAnalyticsEventHandlers) {
        const atlaskitAnalyticsEventHandlers = proxyReactContext.getAtlaskitAnalyticsEventHandlers();
        for (const handler of analyticsActionHandlers) {
            const payloads = handler(action, store) || [];
            payloads.forEach(payload => createAndFire(payload, atlaskitAnalyticsEventHandlers));
        }
    }
    return next(action);
};
//# sourceMappingURL=analyticsProcessing.js.map