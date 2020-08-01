"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var getConnectedRemoteAccounts_1 = require("../actions/getConnectedRemoteAccounts");
exports.connectedRemoteAccountsFailed = function (state, action) {
    if (getConnectedRemoteAccounts_1.isConnectedRemoteAccountFailedAction(action)) {
        return tslib_1.__assign(tslib_1.__assign({}, state), { view: tslib_1.__assign(tslib_1.__assign({}, state.view), { isLoading: false, hasError: true }) });
    }
    else {
        return state;
    }
};
//# sourceMappingURL=connectedRemoteAccountsFailed.js.map