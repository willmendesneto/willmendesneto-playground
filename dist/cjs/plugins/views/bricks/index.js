"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("react");
var media_card_1 = require("@atlaskit/media-card");
var spinner_1 = tslib_1.__importDefault(require("@atlaskit/spinner"));
var grid_1 = require("./grid");
var gridCellScaler_1 = tslib_1.__importDefault(require("../../../popup/tools/gridCellScaler"));
var styled_1 = require("../styled");
var styles_1 = require("../../../popup/components/views/warnings/styles");
var NUMBER_OF_COLUMNS = 4;
var GAP_SIZE = 5;
var CONTAINER_WIDTH = 677;
var BricksView = /** @class */ (function (_super) {
    tslib_1.__extends(BricksView, _super);
    function BricksView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderLoading = function () {
            return (react_1.default.createElement(styled_1.SpinnerWrapper, null,
                react_1.default.createElement(spinner_1.default, null)));
        };
        _this.renderSearchResults = function () {
            var items = _this.props.items;
            return react_1.default.createElement("div", null, _this.renderMasonaryLayout(items));
        };
        _this.renderMasonaryLayout = function (items) {
            if (items.length === 0) {
                return null;
            }
            var _a = _this.props, pluginName = _a.pluginName, selectedItems = _a.selectedItems;
            var cards = items.map(function (item, i) {
                var actualDimensions = item.dimensions, dataURI = item.dataURI, name = item.name, id = item.id;
                var selected = selectedItems.some(function (item) { return item.id === id && item.serviceName === pluginName; });
                var dimensions = gridCellScaler_1.default(tslib_1.__assign(tslib_1.__assign({}, actualDimensions), { gapSize: GAP_SIZE, containerWidth: CONTAINER_WIDTH, numberOfColumns: NUMBER_OF_COLUMNS }));
                var identifier = {
                    dataURI: dataURI,
                    name: name,
                    mediaItemType: 'external-image',
                };
                return (react_1.default.createElement(styles_1.GridCell, { key: i + "-metadata.id", width: dimensions.width },
                    react_1.default.createElement(media_card_1.Card, { mediaClientConfig: {}, identifier: identifier, dimensions: dimensions, selectable: true, selected: selected, onClick: _this.createClickHandler(item) })));
            });
            return (react_1.default.createElement(grid_1.BricksLayout, { id: "mediapicker-bricks-layout", sizes: [{ columns: NUMBER_OF_COLUMNS, gutter: GAP_SIZE }] }, cards));
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
}(react_2.Component));
exports.BricksView = BricksView;
//# sourceMappingURL=index.js.map