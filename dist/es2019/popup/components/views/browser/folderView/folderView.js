import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import dateformat from 'dateformat'; // ToDo: FIL-3207 | replace dateformat library with native solution
import filesize from 'filesize'; // ToDo: FIL-3208 | replace filesize library with native solution
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import { changeCloudAccountFolder } from '../../../../actions/changeCloudAccountFolder';
import { fetchNextCloudFilesPage } from '../../../../actions/fetchNextCloudFilesPage';
import AkButton from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
/* Actions */
import { fileClick } from '../../../../actions/fileClick';
import { isServiceFile, isServiceFolder, } from '../../../../domain';
/* Components */
import Navigation from '../../../navigation/navigation';
import { SpinnerWrapper, FolderViewerWrapper, FolderViewerRow, FileMetadataGroup, FileIcon, FileName, FileCreateDate, FileSize, MoreBtnWrapper, FolderViewerContent, SelectedFileIconWrapper, } from './styled';
import { mapMimeTypeToIcon } from '../../../../tools/mimeTypeToIcon';
const getDateString = (timestamp) => {
    if (!timestamp) {
        return '';
    }
    const todayString = new Date().toDateString();
    const itemDate = new Date(timestamp);
    const itemDateString = itemDate.toDateString();
    return dateformat(itemDate, todayString === itemDateString ? 'H:MM TT' : 'd mmm yyyy');
};
const selectedTick = (React.createElement(SelectedFileIconWrapper, null,
    React.createElement(CheckCircleIcon, { label: "check" })));
/**
 * Routing class that displays view depending on situation.
 */
export class FolderViewer extends Component {
    constructor() {
        super(...arguments);
        this.renderContents = () => {
            if (this.isPageInitialLoading) {
                return (React.createElement(SpinnerWrapper, null,
                    React.createElement(Spinner, { size: "large" })));
            }
            return this.renderFolderContent(this.props.items);
        };
        this.renderServiceFolder = (item, itemIcon) => {
            return (React.createElement(FolderViewerRow, { onClick: this.itemClicked(item), key: item.id },
                React.createElement(FileMetadataGroup, null,
                    React.createElement(FileIcon, null, itemIcon),
                    React.createElement(FileName, null, item.name))));
        };
        this.renderServiceFile = (serviceFile, itemIcon, isSelected) => {
            const tail = isSelected
                ? selectedTick
                : this.renderFileCreateDateAndSize(serviceFile);
            return (React.createElement(FolderViewerRow, { isSelected: isSelected, onClick: this.itemClicked(serviceFile), key: serviceFile.id },
                React.createElement(FileMetadataGroup, null,
                    React.createElement(FileIcon, null, itemIcon),
                    React.createElement(FileName, { isSelected: isSelected }, serviceFile.name)),
                tail));
        };
        this.renderFileCreateDateAndSize = ({ date, size }) => {
            return (React.createElement(FileMetadataGroup, null,
                React.createElement(FileCreateDate, null, getDateString(date)),
                React.createElement(FileSize, null, filesize(size))));
        };
        this.onLoadMoreButtonClick = () => {
            const { service, path, nextCursor, isLoading, onLoadMoreClick, } = this.props;
            if (!isLoading) {
                onLoadMoreClick(service.name, service.accountId, path, nextCursor || '');
            }
        };
    }
    render() {
        return (React.createElement(FolderViewerWrapper, null,
            React.createElement(Navigation, null),
            this.renderContents()));
    }
    get isPageInitialLoading() {
        return this.props.isLoading && !this.props.currentCursor;
    }
    get isPageMoreLoading() {
        return this.props.isLoading && this.props.currentCursor;
    }
    renderFolderContent(items) {
        if (!items) {
            return null;
        }
        const folderItems = items
            .filter(item => item.mimeType.indexOf('application/vnd.google-apps.') === -1)
            .map(item => {
            const itemIcon = mapMimeTypeToIcon(item.mimeType);
            const availableIds = this.props.selectedItems.map(selectedItem => selectedItem.id);
            const isSelected = availableIds.indexOf(item.id) > -1;
            if (isServiceFile(item)) {
                return this.renderServiceFile(item, itemIcon, isSelected);
            }
            else {
                return this.renderServiceFolder(item, itemIcon);
            }
        });
        return (React.createElement(FolderViewerContent, null, [folderItems, this.renderLoadMoreButton()]));
    }
    renderLoadMoreButton() {
        const { nextCursor, isLoading } = this.props;
        if (nextCursor || this.isPageMoreLoading) {
            const label = isLoading ? 'Loading...' : 'Load more';
            return (
            // Key is required as this component is used in array
            React.createElement(MoreBtnWrapper, { key: "load-more-button-wrapper" },
                React.createElement(AkButton, { className: "moreBtn", onClick: this.onLoadMoreButtonClick, isDisabled: isLoading }, label)));
        }
        else {
            return null;
        }
    }
    itemClicked(item) {
        return () => {
            const { service, onFolderClick, onFileClick } = this.props;
            if (isServiceFolder(item)) {
                const path = this.props.path.slice();
                path.push({ id: item.id, name: item.name });
                onFolderClick(service.name, service.accountId, path);
            }
            else {
                const file = {
                    ...item,
                };
                onFileClick(service.name, service.accountId, file);
            }
        };
    }
}
export default connect(({ view, selectedItems }) => ({
    path: view.path,
    service: view.service,
    items: view.items,
    selectedItems,
    isLoading: view.isLoading,
    currentCursor: view.currentCursor,
    nextCursor: view.nextCursor,
}), dispatch => ({
    onFolderClick: (serviceName, accountId, path) => dispatch(changeCloudAccountFolder(serviceName, accountId, path)),
    onFileClick: (serviceName, accountId, file) => dispatch(fileClick(file, serviceName, accountId)),
    onLoadMoreClick: (serviceName, accountId, path, nextCursor) => dispatch(fetchNextCloudFilesPage(serviceName, accountId, path, nextCursor)),
}))(FolderViewer);
//# sourceMappingURL=folderView.js.map