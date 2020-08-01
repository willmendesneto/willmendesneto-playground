import React from 'react';
export class BrowserLoader extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.mounted = false;
        this.state = {
            Browser: BrowserLoader.Browser,
        };
    }
    componentDidMount() {
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    async UNSAFE_componentWillMount() {
        if (!this.state.Browser) {
            const [mediaClient, browserModule] = await Promise.all([
                import(
                /* webpackChunkName:"@atlaskit-media-client" */ '@atlaskit/media-client'),
                import(/* webpackChunkName:"@atlaskit-internal_Browser" */ './browser'),
            ]);
            BrowserLoader.Browser = mediaClient.withMediaClient(browserModule.Browser);
            if (this.mounted) {
                this.setState({
                    Browser: BrowserLoader.Browser,
                });
            }
        }
    }
    render() {
        if (!this.state.Browser) {
            return null;
        }
        return React.createElement(this.state.Browser, Object.assign({}, this.props));
    }
}
BrowserLoader.displayName = 'AsyncBrowser';
//# sourceMappingURL=index.js.map