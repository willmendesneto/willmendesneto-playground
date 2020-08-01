import React from 'react';
export class DropzoneLoader extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            Dropzone: DropzoneLoader.Dropzone,
            MediaPickerErrorBoundary: DropzoneLoader.MediaPickerErrorBoundary,
        };
    }
    async UNSAFE_componentWillMount() {
        if (!this.state.Dropzone || !this.state.MediaPickerErrorBoundary) {
            try {
                const [mediaClient, dropzoneModule, mediaPickerErrorBoundaryModule,] = await Promise.all([
                    import(
                    /* webpackChunkName:"@atlaskit-media-client" */ '@atlaskit/media-client'),
                    import(
                    /* webpackChunkName:"@atlaskit-internal_Dropzone" */ './dropzone'),
                    import(
                    /* webpackChunkName:"@atlaskit-internal_MediaPickerErrorBoundary" */ '../media-picker-analytics-error-boundary'),
                ]);
                DropzoneLoader.Dropzone = mediaClient.withMediaClient(dropzoneModule.Dropzone);
                DropzoneLoader.MediaPickerErrorBoundary =
                    mediaPickerErrorBoundaryModule.default;
                this.setState({
                    Dropzone: DropzoneLoader.Dropzone,
                    MediaPickerErrorBoundary: DropzoneLoader.MediaPickerErrorBoundary,
                });
            }
            catch (error) {
                // TODO [MS-2272]: Add operational error to catch async import error
            }
        }
    }
    render() {
        const { Dropzone, MediaPickerErrorBoundary } = this.state;
        if (!Dropzone || !MediaPickerErrorBoundary) {
            return null;
        }
        return (React.createElement(MediaPickerErrorBoundary, null,
            React.createElement(Dropzone, Object.assign({}, this.props))));
    }
}
DropzoneLoader.displayName = 'AsyncDropzone';
//# sourceMappingURL=index.js.map