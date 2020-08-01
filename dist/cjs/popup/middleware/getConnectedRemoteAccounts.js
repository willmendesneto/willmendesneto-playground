"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var updateServiceList_1 = require("../actions/updateServiceList");
var getConnectedRemoteAccounts_1 = require("../actions/getConnectedRemoteAccounts");
exports.getConnectedRemoteAccounts = function (fetcher) { return function (store) { return function (next) { return function (action) {
    if (getConnectedRemoteAccounts_1.isGetConnectedRemoteAccountsAction(action)) {
        var userMediaClient = store.getState().userMediaClient;
        var servicesList = userMediaClient.config
            .authProvider()
            .then(function (auth) { return fetcher.getServiceList(auth); })
            .catch(function () {
            store.dispatch(getConnectedRemoteAccounts_1.connectedRemoteAccountsFailed());
            return [];
        });
        store.dispatch(updateServiceList_1.updateServiceList(servicesList));
    }
    return next(action);
}; }; }; };
//# sourceMappingURL=getConnectedRemoteAccounts.js.map