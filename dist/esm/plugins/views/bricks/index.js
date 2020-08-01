import { __assign, __extends } from "tslib";
import React from 'react';
import { Component } from 'react';
import { Card } from '@atlaskit/media-card';
import Spinner from '@atlaskit/spinner';
import { BricksLayout } from './grid';
import gridCellScaler from '../../../popup/tools/gridCellScaler';
import { SpinnerWrapper } from '../styled';
import { GridCell } from '../../../popup/components/views/warnings/styles';
var NUMBER_OF_COLUMNS = 4;
var GAP_SIZE = 5;
var CONTAINER_WIDTH = 677;
var BricksView = /** @class */ (function (_super) {
    __extends(BricksView, _super);
    function BricksView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderLoading = function () {
            return (React.createElement(SpinnerWrapper, null,
                React.createElement(Spinner, null)));
        };
        _this.renderSearchResults = function () {
            var items = _this.props.items;
            return React.createElement("div", null, _this.renderMasonaryLayout(items));
        };
        _this.renderMasonaryLayout = function (items) {
            if (items.length === 0) {
                return null;
            }
            var _a = _this.props, pluginName = _a.pluginName, selectedItems = _a.selectedItems;
            var cards = items.map(function (item, i) {
                var actualDimensions = item.dimensions, dataURI = item.dataURI, name = item.name, id = item.id;
                var selected = selectedItems.some(function (item) { return item.id === id && item.serviceName === pluginName; });
                var dimensions = gridCellScaler(__assign(__assign({}, actualDimensions), { gapSize: GAP_SIZE, containerWidth: CONTAINER_WIDTH, numberOfColumns: NUMBER_OF_COLUMNS }));
                var identifier = {
                    dataURI: dataURI,
                    name: name,
                    mediaItemType: 'external-image',
                };
                return (React.createElement(GridCell, { key: i + "-metadata.id", width: dimensions.width },
                    React.createElement(Card, { mediaClientConfig: {}, identifier: identifier, dimensions: dimensions, selectable: true, selected: selected, onClick: _this.createClickHandler(item) })));
            });
            return (React.createElement(BricksLayout, { id: "mediapicker-bricks-layout", sizes: [{ columns: NUMBER_OF_COLUMNS, gutter: GAP_SIZE }] }, cards));
        };
        _this.createClickHandler = function (item) { return function () {
            var onFileClick = _this.props.onFileClick;
            onFileClick(item.id);
        }; };
        return _this;
    }
    BricksView.prototype.render = function () {
        var items = this.props.items;
        if (items.length === 0) {
            return this.renderLoading();
        }
        return this.renderSearchResults();
    };
    return BricksView;
}(Component));
export { BricksView };
//# sourceMappingURL=index.js.map