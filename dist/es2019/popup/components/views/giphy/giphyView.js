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
const NUMBER_OF_COLUMNS = 4;
const GAP_SIZE = 5;
const CONTAINER_WIDTH = 677;
export class GiphyView extends Component {
    constructor(props) {
        super(props);
        this.getContent = () => {
            const { hasError, isLoading, cardModels } = this.props;
            if (hasError) {
                return this.renderError();
            }
            if (!isLoading && cardModels.length === 0) {
                return this.renderEmptyState();
            }
            return this.renderSearchResults();
        };
        this.renderError = () => {
            return React.createElement(NetworkErrorWarning, { action: this.handleRetryButtonClick });
        };
        this.renderEmptyState = () => {
            const { query } = this.state;
            // The GIF used in this error state is too large to store as a data URI (> 3.2 MB)
            return (React.createElement(WarningContainer, null,
                React.createElement(WarningImage, { src: "https://media1.giphy.com/media/10YK5Hh53nC3dK/200w.gif" }),
                React.createElement(WarningHeading, null,
                    React.createElement(FormattedMessage, Object.assign({}, messages.no_gifs_found))),
                React.createElement(WarningSuggestion, null,
                    React.createElement(FormattedMessage, Object.assign({}, messages.no_gifs_found_suggestion, { values: { query } })))));
        };
        this.renderSearchResults = () => {
            const { isLoading, cardModels, totalResultCount } = this.props;
            const isThereAreMoreResults = totalResultCount === undefined ||
                cardModels.length < totalResultCount - 1;
            const shouldShowLoadMoreButton = isLoading || isThereAreMoreResults;
            const loadMoreButton = shouldShowLoadMoreButton && this.renderLoadMoreButton();
            return (React.createElement("div", null,
                this.renderMasonaryLayout(this.props.cardModels),
                loadMoreButton));
        };
        this.renderMasonaryLayout = (cardModels) => {
            if (cardModels.length === 0) {
                return null;
            }
            const cards = cardModels.map((cardModel, i) => {
                const { dataURI, metadata, dimensions: actualDimensions } = cardModel;
                const { selectedItems } = this.props;
                const selected = selectedItems.some(item => item.id === metadata.id && item.serviceName === 'giphy');
                const dimensions = gridCellScaler({
                    ...actualDimensions,
                    gapSize: GAP_SIZE,
                    containerWidth: CONTAINER_WIDTH,
                    numberOfColumns: NUMBER_OF_COLUMNS,
                });
                const identifier = {
                    mediaItemType: 'external-image',
                    dataURI,
                    name: metadata.name,
                };
                return (React.createElement(GridCell, { key: `${i}-metadata.id`, width: dimensions.width },
                    React.createElement(Card, { identifier: identifier, mediaClientConfig: {}, dimensions: dimensions, selectable: true, selected: selected, onClick: this.createClickHandler(cardModel) })));
            });
            return (React.createElement(BricksLayout, { id: "mediapicker-gif-layout", sizes: [{ columns: NUMBER_OF_COLUMNS, gutter: GAP_SIZE }] }, cards));
        };
        this.renderLoadMoreButton = () => {
            const { isLoading } = this.props;
            const iconAfter = isLoading ? React.createElement(Spinner, null) : undefined;
            return (React.createElement(ButtonContainer, null,
                React.createElement(Button, { onClick: this.handleLoadMoreButtonClick, isDisabled: isLoading, iconAfter: iconAfter },
                    React.createElement(FormattedMessage, Object.assign({}, messages.load_more_gifs)))));
        };
        this.createSearchChangeHandler = () => {
            const { onSearchQueryChange } = this.props;
            const debouncedOnSearchQueryChange = debounce(onSearchQueryChange, 1000);
            return (e) => {
                const query = e.currentTarget.value;
                this.setState({
                    query,
                });
                debouncedOnSearchQueryChange(query);
            };
        };
        this.createClickHandler = (cardModel) => () => {
            const { onCardClick } = this.props;
            onCardClick(cardModel);
        };
        this.handleLoadMoreButtonClick = () => {
            const { onLoadMoreButtonClick } = this.props;
            onLoadMoreButtonClick(this.state.query, true);
        };
        this.handleRetryButtonClick = () => {
            const { onSearchQueryChange } = this.props;
            onSearchQueryChange(this.state.query);
        };
        this.state = {
            query: '',
        };
        this.searchChangeHandler = this.createSearchChangeHandler();
    }
    componentDidUpdate({ onSearchQueryChange: oldOnSearchQueryChange, }) {
        const { onSearchQueryChange: newOnSearchQueryChange } = this.props;
        if (oldOnSearchQueryChange !== newOnSearchQueryChange) {
            this.createSearchChangeHandler();
        }
    }
    render() {
        const { intl: { formatMessage }, } = this.props;
        const { query } = this.state;
        return (React.createElement(PluginContentContainer, { id: "mediapicker-giphy-container" },
            React.createElement(Title, null, "GIPHY"),
            React.createElement(TextField, { placeholder: formatMessage(messages.search_all_gifs), onChange: this.searchChangeHandler, value: query }),
            this.getContent()));
    }
}
export default connect(state => ({
    hasError: state.view.hasError,
    isLoading: state.view.isLoading,
    cardModels: state.giphy.imageCardModels,
    totalResultCount: state.giphy.totalResultCount,
    selectedItems: state.selectedItems,
}), dispatch => ({
    onSearchQueryChange: query => dispatch(searchGiphy(query, false)),
    onLoadMoreButtonClick: (query, shouldAppendResults) => dispatch(searchGiphy(query, shouldAppendResults)),
    onCardClick: cardModel => {
        const { id, name, size } = cardModel.metadata;
        dispatch(fileClick({
            mimeType: 'image/gif',
            id: id || '',
            name: name || '',
            size: size || 0,
            date: Date.now(),
        }, 'giphy'));
    },
}))(injectIntl(GiphyView));
//# sourceMappingURL=giphyView.js.map