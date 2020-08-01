import React from 'react';
import { withAnalyticsEvents, withAnalyticsContext, } from '@atlaskit/analytics-next';
import { LocalUploadComponentReact, } from '../localUploadReact';
import { name as packageName, version as packageVersion, } from '../../version.json';
const defaultConfig = { uploadParams: {} };
export class BrowserBase extends LocalUploadComponentReact {
    constructor() {
        super(...arguments);
        this.browserRef = React.createRef();
        this.onFilePicked = (event) => {
            if (!event.target) {
                return;
            }
            const filesArray = [].slice.call(event.target.files);
            try {
                this.uploadService.addFiles(filesArray);
            }
            finally {
                if (this.browserRef.current) {
                    this.browserRef.current.value = '';
                }
            }
        };
        this.browse = () => {
            const { onClose } = this.props;
            if (!this.browserRef.current) {
                return;
            }
            this.browserRef.current.click();
            // Calling onClose directly since there is no dom api to notify us when
            // the native file picker is closed
            if (onClose) {
                onClose();
            }
        };
    }
    componentDidMount() {
        const { onBrowseFn, onCancelFn, isOpen } = this.props;
        if (onBrowseFn) {
            onBrowseFn(this.browse);
        }
        if (onCancelFn) {
            onCancelFn(this.cancel);
        }
        if (isOpen) {
            this.browse();
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isOpen } = this.props;
        const { isOpen: nextIsOpen } = nextProps;
        if (nextIsOpen && nextIsOpen !== isOpen) {
            this.browse();
        }
    }
    render() {
        const { config } = this.props;
        const multiple = config.multiple;
        const fileExtensions = config.fileExtensions && config.fileExtensions.join(',');
        return (React.createElement("input", { "data-testid": "media-picker-file-input", ref: this.browserRef, type: "file", style: { display: 'none' }, multiple: multiple, accept: fileExtensions, onChange: this.onFilePicked }));
    }
}
BrowserBase.defaultProps = {
    config: defaultConfig,
};
export const Browser = withAnalyticsContext({
    attributes: {
        componentName: 'browser',
        packageName,
        packageVersion,
    },
})(withAnalyticsEvents()(BrowserBase));
//# sourceMappingURL=browser.js.map