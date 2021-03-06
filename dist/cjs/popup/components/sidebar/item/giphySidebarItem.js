"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("react");
var react_redux_1 = require("react-redux");
var searchGiphy_1 = require("../../../actions/searchGiphy");
var changeService_1 = require("../../../actions/changeService");
var sidebarItem_1 = require("./sidebarItem");
var icons_1 = require("../icons");
var StatelessGiphySidebarItem = /** @class */ (function (_super) {
    tslib_1.__extends(StatelessGiphySidebarItem, _super);
    function StatelessGiphySidebarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatelessGiphySidebarItem.prototype.render = function () {
        var _a = this.props, isActive = _a.isActive, onChangeService = _a.onChangeService;
        return (react_1.default.createElement(sidebarItem_1.StatelessSidebarItem, { serviceName: "giphy", serviceFullName: "GIPHY", isActive: isActive, onChangeService: onChangeService },
            react_1.default.createElement(icons_1.GiphyIcon, { active: isActive })));
    };
    return StatelessGiphySidebarItem;
}(react_2.Component));
exports.StatelessGiphySidebarItem = StatelessGiphySidebarItem;
var mapDispatchToProps = function (dispatch) { return ({
    onChangeService: function () {
        dispatch(changeService_1.changeService('giphy'));
        dispatch(searchGiphy_1.searchGiphy('', false));
    },
}); };
exports.default = react_redux_1.connect(null, mapDispatchToProps)(StatelessGiphySidebarItem);
//# sourceMappingURL=giphySidebarItem.js.map