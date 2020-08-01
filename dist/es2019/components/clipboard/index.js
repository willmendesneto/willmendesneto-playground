import React from 'react';
export class ClipboardLoader extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            Clipboard: ClipboardLoader.Clipboard,
        };
    }
    async UNSAFE_componentWillMount() {
        if (!this.state.Clipboard) {
            const [mediaClient, clipboardModule] = await Promise.all([
                import(
                /* webpackChunkName:"@atlaskit-media-client" */ '@atlaskit/media-client'),
                import(
                /* webpackChunkName:"@atlaskit-internal_Clipboard" */ './clipboard'),
            ]);
            ClipboardLoader.Clipboard = mediaClient.withMediaClient(clipboardModule.Clipboard);
            this.setState({
                Clipboard: ClipboardLoader.Clipboard,
            });
        }
    }
    render() {
        if (!this.state.Clipboard) {
            return null;
        }
        return React.createElement(this.state.Clipboard, Object.assign({}, this.props));
    }
}
ClipboardLoader.displayName = 'AsyncClipboard';
//# sourceMappingURL=index.js.map