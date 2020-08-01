import { EditorView } from '@atlaskit/media-editor';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { deselectItem } from '../../../actions/deselectItem';
import ErrorView from './errorView/errorView';
import { SpinnerView } from './spinnerView/spinnerView';
import { editorClose } from '../../../actions/editorClose';
import { editorShowError } from '../../../actions/editorShowError';
import { CenterView } from './styles';
export class MainEditorView extends Component {
    constructor() {
        super(...arguments);
        this.renderContent = (editorData) => {
            const { imageUrl, originalFile, error } = editorData;
            if (error) {
                return this.renderError(error);
            }
            else if (imageUrl && originalFile) {
                return (React.createElement(CenterView, null,
                    React.createElement(EditorView, { imageUrl: imageUrl, onSave: this.onEditorSave(originalFile), onCancel: this.onCancel, onError: this.onEditorError })));
            }
            else {
                return React.createElement(SpinnerView, { onCancel: this.onCancel });
            }
        };
        this.onEditorError = (message, retryHandler) => {
            this.props.onShowEditorError({ message, retryHandler });
        };
        this.onEditorSave = (originalFile) => (image) => {
            const { localUploader, onDeselectFile, onCloseEditor } = this.props;
            const filename = originalFile.name;
            const file = this.urltoFile(image, filename);
            localUploader.addFiles([file]);
            onDeselectFile(originalFile.id);
            onCloseEditor('Save');
        };
        this.onCancel = () => {
            this.props.onCloseEditor('Close');
        };
        this.urltoFile = (dataurl, filename) => {
            const arr = dataurl.split(',');
            const matches = arr[0].match(/:(.*?);/);
            if (!matches || matches.length < 2) {
                throw new Error('Failed to retrieve file from data URL');
            }
            const mime = matches[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            const file = new Blob([u8arr], { type: mime });
            file.name = filename;
            return file;
        };
    }
    render() {
        const { editorData } = this.props;
        if (editorData) {
            return this.renderContent(editorData);
        }
        else {
            return null;
        }
    }
    renderError({ message, retryHandler }) {
        return (React.createElement(ErrorView, { message: message, onRetry: retryHandler, onCancel: this.onCancel }));
    }
}
export default connect(({ editorData }) => ({ editorData }), dispatch => ({
    onShowEditorError: ({ message, retryHandler }) => dispatch(editorShowError(message, retryHandler)),
    onCloseEditor: (selection) => dispatch(editorClose(selection)),
    onDeselectFile: fileId => dispatch(deselectItem(fileId)),
}))(MainEditorView);
//# sourceMappingURL=mainEditorView.js.map