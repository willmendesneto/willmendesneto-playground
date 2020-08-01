import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import { Wrapper, InsertButton, CancelButton } from './styled';
import { startImport, hidePopup, resetView } from '../../actions';
export class Footer extends Component {
    renderCancelButton() {
        const { canCancel, onCancel } = this.props;
        return (React.createElement(CancelButton, { testId: "media-picker-cancel-button", appearance: "subtle", onClick: onCancel, isDisabled: !canCancel },
            React.createElement(FormattedMessage, Object.assign({}, messages.cancel))));
    }
    renderInsertButton() {
        const { selectedItems, canInsert, onInsert } = this.props;
        const itemCount = selectedItems.length;
        if (itemCount === 0) {
            return null;
        }
        const onClick = () => onInsert(selectedItems);
        return (React.createElement(InsertButton, { testId: "media-picker-insert-button", appearance: "primary", onClick: onClick, isDisabled: !canInsert, autoFocus: true },
            React.createElement(FormattedMessage, Object.assign({}, messages.insert_files, { values: {
                    0: itemCount,
                } }))));
    }
    render() {
        return (React.createElement(Wrapper, null,
            this.renderInsertButton(),
            this.renderCancelButton()));
    }
}
const mapStateToProps = ({ isUploading, isCancelling, selectedItems, }) => {
    const isUploadingOrCancelling = isUploading || isCancelling;
    return {
        selectedItems,
        canInsert: !isUploadingOrCancelling,
        canCancel: !isUploadingOrCancelling,
    };
};
const mapDispatchToProps = (dispatch) => ({
    onInsert: () => dispatch(startImport()),
    onCancel: () => {
        dispatch(resetView());
        dispatch(hidePopup());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
//# sourceMappingURL=footer.js.map