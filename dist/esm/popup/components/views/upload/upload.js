import { __assign, __awaiter, __extends, __generator } from "tslib";
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
var createEditCardAction = function (handler, label) {
    return {
        label: label,
        handler: handler,
        icon: React.createElement(AnnotateIcon, { label: menuEdit, size: "medium" }),
    };
};
var createDeleteCardAction = function (handler) {
    return {
        label: menuDelete,
        handler: handler,
        icon: React.createElement(TrashIcon, { label: menuDelete, size: "medium" }),
    };
};
var cardDimension = { width: 160, height: 108 };
var StatelessUploadView = /** @class */ (function (_super) {
    __extends(StatelessUploadView, _super);
    function StatelessUploadView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mounted = false;
        _this.state = {
            hasPopupBeenVisible: false,
            isWebGLWarningFlagVisible: false,
            shouldDismissWebGLWarningFlag: false,
            isLoadingNextPage: false,
        };
        _this.renderDeleteConfirmation = function () {
            var deletionCandidate = _this.state.deletionCandidate;
            var removeFileFromRecents = _this.props.removeFileFromRecents;
            var closeDialog = function () {
                _this.setState({ deletionCandidate: undefined });
            };
            if (!deletionCandidate) {
                return null;
            }
            var id = deletionCandidate.id, occurrenceKey = deletionCandidate.occurrenceKey;
            var actions = [
                {
                    text: 'Delete permanently',
                    onClick: function () {
                        removeFileFromRecents(id, occurrenceKey);
                        closeDialog();
                    },
                },
                {
                    text: 'Cancel',
                    onClick: function () {
                        closeDialog();
                    },
                },
            ];
            return (React.createElement(ModalTransition, null,
                React.createElement(ModalDialog, { width: "small", appearance: "danger", heading: "Delete forever?", actions: actions, onClose: closeDialog }, "This file is about to be permanently deleted. Once you delete, it's gone for good.")));
        };
        _this.onThresholdReachedListener = function () {
            var isLoadingNextPage = _this.state.isLoadingNextPage;
            if (isLoadingNextPage) {
                return;
            }
            _this.setState({ isLoadingNextPage: true }, function () { return __awaiter(_this, void 0, void 0, function () {
                var mediaClient;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, , 2, 3]);
                            mediaClient = this.props.mediaClient;
                            return [4 /*yield*/, mediaClient.collection.loadNextPage(RECENTS_COLLECTION)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            if (this.mounted) {
                                this.setState({ isLoadingNextPage: false });
                            }
                            return [7 /*endfinally*/];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        };
        _this.renderLoadingView = function () {
            return (React.createElement(SpinnerWrapper, null,
                React.createElement(Spinner, { size: "large" })));
        };
        _this.renderLoadingNextPageView = function () {
            var isLoadingNextPage = _this.state.isLoadingNextPage;
            // We want to always render LoadingNextPageWrapper regardless of the next page loading or not
            // to keep the same wrapper height, this prevents jumping when interacting with the infinite scroll
            return (React.createElement(LoadingNextPageWrapper, null, isLoadingNextPage && React.createElement(Spinner, null)));
        };
        _this.renderRecentsView = function (cards) {
            var isWebGLWarningFlagVisible = _this.state.isWebGLWarningFlagVisible;
            return (React.createElement("div", null,
                React.createElement(RecentUploadsTitle, null,
                    React.createElement(FormattedMessage, __assign({}, messages.recent_uploads))),
                React.createElement(CardsWrapper, null, cards),
                _this.renderLoadingNextPageView(),
                isWebGLWarningFlagVisible && _this.renderWebGLWarningFlag()));
        };
        _this.renderWebGLWarningFlag = function () {
            var formatMessage = _this.props.intl.formatMessage;
            return (React.createElement(FlagGroup, { onDismissed: _this.onFlagDismissed },
                React.createElement(Flag, { description: formatMessage(messages.webgl_warning_description), icon: React.createElement(EditorInfoIcon, { label: "info" }), id: "webgl-warning-flag", title: formatMessage(messages.unable_to_annotate_image), actions: [
                        {
                            content: formatMessage(messages.learn_more),
                            onClick: _this.onLearnMoreClicked,
                        },
                    ] })));
        };
        _this.onFlagDismissed = function () {
            _this.setState({ isWebGLWarningFlagVisible: false });
        };
        _this.onLearnMoreClicked = function () {
            _this.setState({ shouldDismissWebGLWarningFlag: true });
            _this.onFlagDismissed();
            window.open('https://get.webgl.org/');
        };
        return _this;
    }
    StatelessUploadView.prototype.componentDidMount = function () {
        this.mounted = true;
    };
    StatelessUploadView.prototype.componentWillUnmount = function () {
        this.mounted = false;
    };
    StatelessUploadView.prototype.render = function () {
        var _a = this.props, isLoading = _a.isLoading, browserRef = _a.browserRef;
        var cards = this.renderCards();
        var isEmpty = !isLoading && cards.length === 0;
        var contentPart = null;
        if (isLoading) {
            contentPart = this.renderLoadingView();
        }
        else if (!isEmpty) {
            contentPart = this.renderRecentsView(cards);
        }
        var confirmationDialog = this.renderDeleteConfirmation();
        return (React.createElement(InfiniteScroll, { "data-testid": "media-picker-recents-infinite-scroll", height: "100%", onThresholdReached: this.onThresholdReachedListener },
            React.createElement(Wrapper, null,
                React.createElement(Dropzone, { isEmpty: isEmpty, browserRef: browserRef }),
                contentPart,
                confirmationDialog)));
    };
    StatelessUploadView.prototype.onAnnotateActionClick = function (callback) {
        var _this = this;
        return function () {
            if (isWebGLAvailable()) {
                callback();
            }
            else {
                _this.showWebGLWarningFlag();
            }
        };
    };
    StatelessUploadView.prototype.renderCards = function () {
        var recentFilesCards = this.recentFilesCards();
        var uploadingFilesCards = this.uploadingFilesCards();
        return uploadingFilesCards.concat(recentFilesCards).map(function (_a) {
            var key = _a.key, card = _a.card;
            return (React.createElement(CardWrapper, { tabIndex: 0, key: key }, card));
        });
    };
    StatelessUploadView.prototype.uploadingFilesCards = function () {
        var _this = this;
        var _a = this.props, uploads = _a.uploads, onFileClick = _a.onFileClick, mediaClient = _a.mediaClient;
        var itemsKeys = Object.keys(uploads);
        itemsKeys.sort(function (a, b) {
            return uploads[b].index - uploads[a].index;
        });
        var selectedIds = this.props.selectedItems
            .filter(function (item) { return item.serviceName === 'upload'; })
            .map(function (item) { return item.id; });
        return itemsKeys.map(function (key) {
            var item = _this.props.uploads[key];
            var file = item.file;
            var mediaType = getMediaTypeFromMimeType(file.metadata.mimeType);
            var fileMetadata = __assign(__assign({}, file.metadata), { mimeType: mediaType });
            var id = fileMetadata.id, size = fileMetadata.size, name = fileMetadata.name, occurrenceKey = fileMetadata.occurrenceKey;
            var selected = selectedIds.indexOf(id) > -1;
            var serviceFile = {
                id: id,
                mimeType: mediaType,
                name: name,
                size: size,
                occurrenceKey: occurrenceKey,
                date: 0,
            };
            var onClick = function () { return onFileClick(serviceFile, 'upload'); };
            var actions = [
                createDeleteCardAction(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.setState({
                            deletionCandidate: { id: id, occurrenceKey: occurrenceKey },
                        });
                        return [2 /*return*/];
                    });
                }); }),
            ]; // TODO [MS-1017]: allow file annotation for uploading files
            var identifier = {
                id: id,
                mediaItemType: 'file',
                collectionName: RECENTS_COLLECTION,
            };
            return {
                isUploading: true,
                key: id,
                card: (React.createElement(Card, { mediaClientConfig: mediaClient.config, identifier: identifier, dimensions: cardDimension, selectable: true, selected: selected, onClick: onClick, actions: actions, testId: "media-picker-uploading-media-card" })),
            };
        });
    };
    StatelessUploadView.prototype.recentFilesCards = function () {
        var _this = this;
        var _a = this.props, mediaClient = _a.mediaClient, recents = _a.recents, recentsCollection = _a.recentsCollection, selectedItems = _a.selectedItems, onFileClick = _a.onFileClick, onEditRemoteImage = _a.onEditRemoteImage, formatMessage = _a.intl.formatMessage;
        var items = recents.items;
        var selectedRecentFiles = selectedItems
            .filter(function (item) { return item.serviceName === 'recent_files'; })
            .map(function (item) { return item.id; });
        var onClick = function (_a) {
            var mediaItemDetails = _a.mediaItemDetails;
            var fileDetails = mediaItemDetails;
            if (fileDetails) {
                var id = fileDetails.id;
                onFileClick({
                    id: id,
                    date: 0,
                    name: fileDetails.name || '',
                    mimeType: fileDetails.mimeType || '',
                    size: fileDetails.size || 0,
                    createdAt: fileDetails.createdAt || 0,
                }, 'recent_files');
            }
        };
        var editHandler = function (mediaItem) {
            if (mediaItem && mediaItem.type === 'file') {
                var _a = mediaItem.details, id = _a.id, name_1 = _a.name;
                if (isWebGLAvailable()) {
                    onEditRemoteImage({
                        id: id,
                        name: name_1 || '',
                    }, recentsCollection);
                }
                else {
                    // WebGL not available - show warning flag
                    _this.showWebGLWarningFlag();
                }
            }
        };
        return items.map(function (item) {
            var id = item.id, occurrenceKey = item.occurrenceKey, details = item.details;
            var selected = selectedRecentFiles.indexOf(id) > -1;
            var actions = [
                createDeleteCardAction(function () {
                    _this.setState({ deletionCandidate: { id: id, occurrenceKey: occurrenceKey } });
                }),
            ];
            if (details.mediaType === 'image') {
                actions.unshift(createEditCardAction(editHandler, formatMessage(messages.annotate)));
            }
            var identifier = {
                id: id,
                mediaItemType: 'file',
                collectionName: recentsCollection,
            };
            return {
                key: occurrenceKey + "-" + id,
                card: (React.createElement(Card, { mediaClientConfig: mediaClient.config, identifier: identifier, dimensions: cardDimension, selectable: true, selected: selected, onClick: onClick, actions: actions, testId: "media-picker-recent-media-card" })),
            };
        });
    };
    StatelessUploadView.prototype.showWebGLWarningFlag = function () {
        this.setState({ isWebGLWarningFlagVisible: true });
    };
    return StatelessUploadView;
}(Component));
export { StatelessUploadView };
var mapStateToProps = function (state) { return ({
    isLoading: state.view.isLoading,
    recents: state.recents,
    uploads: state.uploads,
    selectedItems: state.selectedItems,
}); };
var mapDispatchToProps = function (dispatch) { return ({
    onFileClick: function (serviceFile, serviceName) {
        return dispatch(fileClick(serviceFile, serviceName));
    },
    onEditorShowImage: function (file, dataUri) {
        return dispatch(editorShowImage(dataUri, file));
    },
    onEditRemoteImage: function (file, collectionName) {
        return dispatch(editRemoteImage(file, collectionName));
    },
    removeFileFromRecents: function (id, occurrenceKey) {
        return dispatch(removeFileFromRecents(id, occurrenceKey));
    },
}); };
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(StatelessUploadView));
//# sourceMappingURL=upload.js.map