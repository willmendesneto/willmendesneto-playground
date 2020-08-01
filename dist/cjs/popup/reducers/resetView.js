"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var resetView_1 = require("../actions/resetView");
function resetView(state, action) {
    if (resetView_1.isResetViewAction(action)) {
        return tslib_1.__assign(tslib_1.__assign({}, state), { selectedItems: [], uploads: {} });
    }
    else {
        return state;
    }
}
exports.default = resetView;
//# sourceMappingURL=resetView.js.map