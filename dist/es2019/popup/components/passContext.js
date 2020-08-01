import { Component } from 'react';
import { intlShape, IntlProvider } from 'react-intl';
export default class PassContext extends Component {
    constructor() {
        super(...arguments);
        this.createDefaultI18nProvider = () => new IntlProvider({ locale: 'en' }).getChildContext().intl;
    }
    getChildContext() {
        const { store, proxyReactContext } = this.props;
        const getAtlaskitAnalyticsEventHandlers = proxyReactContext && proxyReactContext.getAtlaskitAnalyticsEventHandlers
            ? proxyReactContext.getAtlaskitAnalyticsEventHandlers
            : () => [];
        const intl = (proxyReactContext && proxyReactContext.intl) ||
            this.createDefaultI18nProvider();
        return {
            store,
            getAtlaskitAnalyticsEventHandlers,
            intl,
        };
    }
    render() {
        const { children } = this.props;
        return children;
    }
}
// We need to manually specify all the child contexts
PassContext.childContextTypes = {
    store() { },
    getAtlaskitAnalyticsEventHandlers() { },
    intl: intlShape,
};
//# sourceMappingURL=passContext.js.map