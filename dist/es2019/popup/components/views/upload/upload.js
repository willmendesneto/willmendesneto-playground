import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Card, } from '@atlaskit/media-card';
import { getMediaTypeFromMimeType, } from '@atlaskit/media-client';
import { RECENTS_COLLECTION } from '@atlaskit/media-client/constants';
import Spinner from '@atlaskit/spinner';
import Flag, { FlagGroup } from '@atlaskit/flag';
import AnnotateIcon from '@atlaskit/icon/glyph/media-services/annotate';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import EditorInfoIcon from '@atlaskit/icon/glyph/error';
import { FormattedMessage, injectIntl } from 'react-intl';
import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog';
import { messages, InfiniteScroll } from '@atlaskit/media-ui';
import { isWebGLAvailable } from '../../../tools/webgl';
import { Dropzone } from './dropzone';
import { fileClick } from '../../../actions/fileClick';
import { editorShowImage } from '../../../actions/editorShowImage';
import { editRemoteImage } from '../../../actions/editRemoteImage';
import { menuDelete, menuEdit } from '../editor/phrases';
import { Wrapper, SpinnerWrapper, LoadingNextPageWrapper, CardsWrapper, RecentUploadsTitle, CardWrapper, } from './styled';
import { removeFileFromRecents } from '../../../actions/removeFileFromRecents';
const createEditCardAction = (handler, label) => {
    return {
        label,
        handler,
        icon: React.createElement(AnnotateIcon, { label: menuEdit, size: "medium" }),
    };
};
const createDeleteCardAction = (handler) => {
    return {
        label: menuDelete,
        handler,
        icon: React.createElement(TrashIcon, { label: menuDelete, size: "medium" }),
    };
};
const cardDimension = { width: 160, height: 108 };
export class StatelessUploadView extends Component {
    constructor() {
        super(...arguments);
        this.mounted = false;
        this.state = {
            hasPopupBeenVisible: false,
            isWebGLWarningFlagVisible: false,
            shouldDismissWebGLWarningFlag: false,
            isLoadingNextPage: false,
        };
        this.renderDeleteConfirmation = () => {
            const { deletionCandidate } = this.state;
            const { removeFileFromRecents } = this.props;
            const closeDialog = () => {
                this.setState({ deletionCandidate: undefined });
            };
            if (!deletionCandidate) {
                return null;
            }
            const { id, occurrenceKey } = deletionCandidate;
            const actions = [
                {
                    text: 'Delete permanently',
                    onClick: () => {
                        removeFileFromRecents(id, occurrenceKey);
                        closeDialog();
                    },
                },
                {
                    text: 'Cancel',
                    onClick: () => {
                        closeDialog();
                    },
                },
            ];
            return (React.createElement(ModalTransition, null,
                React.createElement(ModalDialog, { width: "small", appearance: "danger", heading: "Delete forever?", actions: actions, onClose: closeDialog }, "This file is about to be permanently deleted. Once you delete, it's gone for good.")));
        };
        this.onThresholdReachedListener = () => {
            const { isLoadingNextPage } = this.state;
            if (isLoadingNextPage) {
                return;
            }
            this.setState({ isLoadingNextPage: true }, async () => {
                try {
                    const { mediaClient } = this.props;
                    await mediaClient.collection.loadNextPage(RECENTS_COLLECTION);
                }
                finally {
                    if (this.mounted) {
                        this.setState({ isLoadingNextPage: false });
                    }
                }
            });
        };
        this.renderLoadingView = () => {
            return (React.createElement(SpinnerWrapper, null,
                React.createElement(Spinner, { size: "large" })));
        };
        this.renderLoadingNextPageView = () => {
            const { isLoadingNextPage } = this.state;
            // We want to always render LoadingNextPageWrapper regardless of the next page loading or not
            // to keep the same wrapper height, this prevents jumping when interacting with the infinite scroll
            return (React.createElement(LoadingNextPageWrapper, null, isLoadingNextPage && React.createElement(Spinner, null)));
        };
        this.renderRecentsView = (cards) => {
            const { isWebGLWarningFlagVisible } = this.state;
            return (React.createElement("div", null,
                React.createElement(RecentUploadsTitle, null,
                    React.createElement(FormattedMessage, Object.assign({}, messages.recent_uploads))),
                React.createElement(CardsWrapper, null, cards),
                this.renderLoadingNextPageView(),
                isWebGLWarningFlagVisible && this.renderWebGLWarningFlag()));
        };
        this.renderWebGLWarningFlag = () => {
            const { intl: { formatMessage }, } = this.props;
            return (React.createElement(FlagGroup, { onDismissed: this.onFlagDismissed },
                React.createElement(Flag, { description: formatMessage(messages.webgl_warning_description), icon: React.createElement(EditorInfoIcon, { label: "info" }), id: "webgl-warning-flag", title: formatMessage(messages.unable_to_annotate_image), actions: [
                        {
                            content: formatMessage(messages.learn_more),
                            onClick: this.onLearnMoreClicked,
                        },
                    ] })));
        };
        this.onFlagDismissed = () => {
            this.setState({ isWebGLWarningFlagVisible: false });
        };
        this.onLearnMoreClicked = () => {
            this.setState({ shouldDismissWebGLWarningFlag: true });
            this.onFlagDismissed();
            window.open('https://get.webgl.org/');
        };
    }
    componentDidMount() {
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    render() {
        const { isLoading, browserRef } = this.props;
        const cards = this.renderCards();
        const isEmpty = !isLoading && cards.length === 0;
        let contentPart = null;
        if (isLoading) {
            contentPart = this.renderLoadingView();
        }
        else if (!isEmpty) {
            contentPart = this.renderRecentsView(cards);
        }
        const confirmationDialog = this.renderDeleteConfirmation();
        return (React.createElement(InfiniteScroll, { "data-testid": "media-picker-recents-infinite-scroll", height: "100%", onThresholdReached: this.onThresholdReachedListener },
            React.createElement(Wrapper, null,
                React.createElement(Dropzone, { isEmpty: isEmpty, browserRef: browserRef }),
                contentPart,
                confirmationDialog)));
    }
    onAnnotateActionClick(callback) {
        return () => {
            if (isWebGLAvailable()) {
                callback();
            }
            else {
                this.showWebGLWarningFlag();
            }
        };
    }
    renderCards() {
        const recentFilesCards = this.recentFilesCards();
        const uploadingFilesCards = this.uploadingFilesCards();
        return uploadingFilesCards.concat(recentFilesCards).map(({ key, card }) => (React.createElement(CardWrapper, { tabIndex: 0, key: key }, card)));
    }
    uploadingFilesCards() {
        const { uploads, onFileClick, mediaClient } = this.props;
        const itemsKeys = Object.keys(uploads);
        itemsKeys.sort((a, b) => {
            return uploads[b].index - uploads[a].index;
        });
        const selectedIds = this.props.selectedItems
            .filter(item => item.serviceName === 'upload')
            .map(item => item.id);
        return itemsKeys.map(key => {
            const item = this.props.uploads[key];
            const { file } = item;
            const mediaType = getMediaTypeFromMimeType(file.metadata.mimeType);
            const fileMetadata = {
                ...file.metadata,
                mimeType: mediaType,
            };
            const { id, size, name, occurrenceKey } = fileMetadata;
            const selected = selectedIds.indexOf(id) > -1;
            const serviceFile = {
                id,
                mimeType: mediaType,
                name,
                size,
                occurrenceKey,
                date: 0,
            };
            const onClick = () => onFileClick(serviceFile, 'upload');
            const actions = [
                createDeleteCardAction(async () => {
                    this.setState({
                        deletionCandidate: { id, occurrenceKey },
                    });
                }),
            ]; // TODO [MS-1017]: allow file annotation for uploading files
            const identifier = {
                id,
                mediaItemType: 'file',
                collectionName: RECENTS_COLLECTION,
            };
            return {
                isUploading: true,
                key: id,
                card: (React.createElement(Card, { mediaClientConfig: mediaClient.config, identifier: identifier, dimensions: cardDimension, selectable: true, selected: selected, onClick: onClick, actions: actions, testId: "media-picker-uploading-media-card" })),
            };
        });
    }
    recentFilesCards() {
        const { mediaClient, recents, recentsCollection, selectedItems, onFileClick, onEditRemoteImage, intl: { formatMessage }, } = this.props;
        const { items } = recents;
        const selectedRecentFiles = selectedItems
            .filter(item => item.serviceName === 'recent_files')
            .map(item => item.id);
        const onClick = ({ mediaItemDetails }) => {
            const fileDetails = mediaItemDetails;
            if (fileDetails) {
                const { id } = fileDetails;
                onFileClick({
                    id,
                    date: 0,
                    name: fileDetails.name || '',
                    mimeType: fileDetails.mimeType || '',
                    size: fileDetails.size || 0,
                    createdAt: fileDetails.createdAt || 0,
                }, 'recent_files');
            }
        };
        const editHandler = (mediaItem) => {
            if (mediaItem && mediaItem.type === 'file') {
                const { id, name } = mediaItem.details;
                if (isWebGLAvailable()) {
                    onEditRemoteImage({
                        id,
                        name: name || '',
                    }, recentsCollection);
                }
                else {
                    // WebGL not available - show warning flag
                    this.showWebGLWarningFlag();
                }
            }
        };
        return items.map(item => {
            const { id, occurrenceKey, details } = item;
            const selected = selectedRecentFiles.indexOf(id) > -1;
            const actions = [
                createDeleteCardAction(() => {
                    this.setState({ deletionCandidate: { id, occurrenceKey } });
                }),
            ];
            if (details.mediaType === 'image') {
                actions.unshift(createEditCardAction(editHandler, formatMessage(messages.annotate)));
            }
            const identifier = {
                id,
                mediaItemType: 'file',
                collectionName: recentsCollection,
            };
            return {
                key: `${occurrenceKey}-${id}`,
                card: (React.createElement(Card, { mediaClientConfig: mediaClient.config, identifier: identifier, dimensions: cardDimension, selectable: true, selected: selected, onClick: onClick, actions: actions, testId: "media-picker-recent-media-card" })),
            };
        });
    }
    showWebGLWarningFlag() {
        this.setState({ isWebGLWarningFlagVisible: true });
    }
}
const mapStateToProps = (state) => ({
    isLoading: state.view.isLoading,
    recents: state.recents,
    uploads: state.uploads,
    selectedItems: state.selectedItems,
});
const mapDispatchToProps = (dispatch) => ({
    onFileClick: (serviceFile, serviceName) => dispatch(fileClick(serviceFile, serviceName)),
    onEditorShowImage: (file, dataUri) => dispatch(editorShowImage(dataUri, file)),
    onEditRemoteImage: (file, collectionName) => dispatch(editRemoteImage(file, collectionName)),
    removeFileFromRecents: (id, occurrenceKey) => dispatch(removeFileFromRecents(id, occurrenceKey)),
});
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(StatelessUploadView));
//# sourceMappingURL=upload.js.map