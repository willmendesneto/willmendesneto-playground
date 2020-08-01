import React from 'react';
import { Component } from 'react';
import { Card } from '@atlaskit/media-card';
import Spinner from '@atlaskit/spinner';
import { BricksLayout } from './grid';
import gridCellScaler from '../../../popup/tools/gridCellScaler';
import { SpinnerWrapper } from '../styled';
import { GridCell } from '../../../popup/components/views/warnings/styles';
const NUMBER_OF_COLUMNS = 4;
const GAP_SIZE = 5;
const CONTAINER_WIDTH = 677;
export class BricksView extends Component {
    constructor() {
        super(...arguments);
        this.renderLoading = () => {
            return (React.createElement(SpinnerWrapper, null,
                React.createElement(Spinner, null)));
        };
        this.renderSearchResults = () => {
            const { items } = this.props;
            return React.createElement("div", null, this.renderMasonaryLayout(items));
        };
        this.renderMasonaryLayout = (items) => {
            if (items.length === 0) {
                return null;
            }
            const { pluginName, selectedItems } = this.props;
            const cards = items.map((item, i) => {
                const { dimensions: actualDimensions, dataURI, name, id } = item;
                const selected = selectedItems.some(item => item.id === id && item.serviceName === pluginName);
                const dimensions = gridCellScaler({
                    ...actualDimensions,
                    gapSize: GAP_SIZE,
                    containerWidth: CONTAINER_WIDTH,
                    numberOfColumns: NUMBER_OF_COLUMNS,
                });
                const identifier = {
                    dataURI,
                    name,
                    mediaItemType: 'external-image',
                };
                return (React.createElement(GridCell, { key: `${i}-metadata.id`, width: dimensions.width },
                    React.createElement(Card, { mediaClientConfig: {}, identifier: identifier, dimensions: dimensions, selectable: true, selected: selected, onClick: this.createClickHandler(item) })));
            });
            return (React.createElement(BricksLayout, { id: "mediapicker-bricks-layout", sizes: [{ columns: NUMBER_OF_COLUMNS, gutter: GAP_SIZE }] }, cards));
        };
        this.createClickHandler = (item) => () => {
            const { onFileClick } = this.props;
            onFileClick(item.id);
        };
    }
    render() {
        const { items } = this.props;
        if (items.length === 0) {
            return this.renderLoading();
        }
        return this.renderSearchResults();
    }
}
//# sourceMappingURL=index.js.map