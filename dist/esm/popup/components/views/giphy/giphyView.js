import { __assign, __extends } from "tslib";
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import TextField from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import { Card } from '@atlaskit/media-card';
import { BricksLayout } from '../../../../plugins/views/bricks/grid';
import { fileClick } from '../../../actions/fileClick';
import gridCellScaler from '../../../tools/gridCellScaler';
import { searchGiphy } from '../../../actions/searchGiphy';
import NetworkErrorWarning from '../warnings/networkError';
import { Title, ButtonContainer, GridCell, WarningContainer, WarningImage, WarningHeading, WarningSuggestion, } from '../warnings/styles';
import { PluginContentContainer } from '../../../../plugins/forge/components/styled';
var NUMBER_OF_COLUMNS = 4;
var GAP_SIZE = 5;
var CONTAINER_WIDTH = 677;
var GiphyView = /** @class */ (function (_super) {
    __extends(GiphyView, _super);
    function GiphyView(props) {
        var _this = _super.call(this, props) || this;
        _this.getContent = function () {
            var _a = _this.props, hasError = _a.hasError, isLoading = _a.isLoading, cardModels = _a.cardModels;
            if (hasError) {
                return _this.renderError();
            }
            if (!isLoading && cardModels.length === 0) {
                return _this.renderEmptyState();
            }
            return _this.renderSearchResults();
        };
        _this.renderError = function () {
            return React.createElement(NetworkErrorWarning, { action: _this.handleRetryButtonClick });
        };
        _this.renderEmptyState = function () {
            var query = _this.state.query;
            // The GIF used in this error state is too large to store as a data URI (> 3.2 MB)
            return (React.createElement(WarningContainer, null,
                React.createElement(WarningImage, { src: "https://media1.giphy.com/media/10YK5Hh53nC3dK/200w.gif" }),
                React.createElement(WarningHeading, null,
                    React.createElement(FormattedMessage, __assign({}, messages.no_gifs_found))),
                React.createElement(WarningSuggestion, null,
                    React.createElement(FormattedMessage, __assign({}, messages.no_gifs_found_suggestion, { values: { query: query } })))));
        };
        _this.renderSearchResults = function () {
            var _a = _this.props, isLoading = _a.isLoading, cardModels = _a.cardModels, totalResultCount = _a.totalResultCount;
            var isThereAreMoreResults = totalResultCount === undefined ||
                cardModels.length < totalResultCount - 1;
            var shouldShowLoadMoreButton = isLoading || isThereAreMoreResults;
            var loadMoreButton = shouldShowLoadMoreButton && _this.renderLoadMoreButton();
            return (React.createElement("div", null,
                _this.renderMasonaryLayout(_this.props.cardModels),
                loadMoreButton));
        };
        _this.renderMasonaryLayout = function (cardModels) {
            if (cardModels.length === 0) {
                return null;
            }
            var cards = cardModels.map(function (cardModel, i) {
                var dataURI = cardModel.dataURI, metadata = cardModel.metadata, actualDimensions = cardModel.dimensions;
                var selectedItems = _this.props.selectedItems;
                var selected = selectedItems.some(function (item) { return item.id === metadata.id && item.serviceName === 'giphy'; });
                var dimensions = gridCellScaler(__assign(__assign({}, actualDimensions), { gapSize: GAP_SIZE, containerWidth: CONTAINER_WIDTH, numberOfColumns: NUMBER_OF_COLUMNS }));
                var identifier = {
                    mediaItemType: 'external-image',
                    dataURI: dataURI,
                    name: metadata.name,
                };
                return (React.createElement(GridCell, { key: i + "-metadata.id", width: dimensions.width },
                    React.createElement(Card, { identifier: identifier, mediaClientConfig: {}, dimensions: dimensions, selectable: true, selected: selected, onClick: _this.createClickHandler(cardModel) })));
            });
            return (React.createElement(BricksLayout, { id: "mediapicker-gif-layout", sizes: [{ columns: NUMBER_OF_COLUMNS, gutter: GAP_SIZE }] }, cards));
        };
        _this.renderLoadMoreButton = function () {
            var isLoading = _this.props.isLoading;
            var iconAfter = isLoading ? React.createElement(Spinner, null) : undefined;
            return (React.createElement(ButtonContainer, null,
                React.createElement(Button, { onClick: _this.handleLoadMoreButtonClick, isDisabled: isLoading, iconAfter: iconAfter },
                    React.createElement(FormattedMessage, __assign({}, messages.load_more_gifs)))));
        };
        _this.createSearchChangeHandler = function () {
            var onSearchQueryChange = _this.props.onSearchQueryChange;
            var debouncedOnSearchQueryChange = debounce(onSearchQueryChange, 1000);
            return function (e) {
                var query = e.currentTarget.value;
                _this.setState({
                    query: query,
                });
                debouncedOnSearchQueryChange(query);
            };
        };
        _this.createClickHandler = function (cardModel) { return function () {
            var onCardClick = _this.props.onCardClick;
            onCardClick(cardModel);
        }; };
        _this.handleLoadMoreButtonClick = function () {
            var onLoadMoreButtonClick = _this.props.onLoadMoreButtonClick;
            onLoadMoreButtonClick(_this.state.query, true);
        };
        _this.handleRetryButtonClick = function () {
            var onSearchQueryChange = _this.props.onSearchQueryChange;
            onSearchQueryChange(_this.state.query);
        };
        _this.state = {
            query: '',
        };
        _this.searchChangeHandler = _this.createSearchChangeHandler();
        return _this;
    }
    GiphyView.prototype.componentDidUpdate = function (_a) {
        var oldOnSearchQueryChange = _a.onSearchQueryChange;
        var newOnSearchQueryChange = this.props.onSearchQueryChange;
        if (oldOnSearchQueryChange !== newOnSearchQueryChange) {
            this.createSearchChangeHandler();
        }
    };
    GiphyView.prototype.render = function () {
        var formatMessage = this.props.intl.formatMessage;
        var query = this.state.query;
        return (React.createElement(PluginContentContainer, { id: "mediapicker-giphy-container" },
            React.createElement(Title, null, "GIPHY"),
            React.createElement(TextField, { placeholder: formatMessage(messages.search_all_gifs), onChange: this.searchChangeHandler, value: query }),
            this.getContent()));
    };
    return GiphyView;
}(Component));
export { GiphyView };
export default connect(function (state) { return ({
    hasError: state.view.hasError,
    isLoading: state.view.isLoading,
    cardModels: state.giphy.imageCardModels,
    totalResultCount: state.giphy.totalResultCount,
    selectedItems: state.selectedItems,
}); }, function (dispatch) { return ({
    onSearchQueryChange: function (query) { return dispatch(searchGiphy(query, false)); },
    onLoadMoreButtonClick: function (query, shouldAppendResults) {
        return dispatch(searchGiphy(query, shouldAppendResults));
    },
    onCardClick: function (cardModel) {
        var _a = cardModel.metadata, id = _a.id, name = _a.name, size = _a.size;
        dispatch(fileClick({
            mimeType: 'image/gif',
            id: id || '',
            name: name || '',
            size: size || 0,
            date: Date.now(),
        }, 'giphy'));
    },
}); })(injectIntl(GiphyView));
//# sourceMappingURL=giphyView.js.map