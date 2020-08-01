import { __awaiter, __generator } from "tslib";
import jwtDecode from 'jwt-decode';
import { isClientBasedAuth, } from '@atlaskit/media-core';
var getAuthFromEdgeData = function (response) { return ({
    clientId: response.data.clientId,
    token: response.data.token,
    baseUrl: response.data.baseUrl,
}); };
var getClientIdFromAuth = function (auth) {
    if (isClientBasedAuth(auth)) {
        return auth.clientId;
    }
    var tokenData = jwtDecode(auth.token);
    return tokenData.clientId;
};
export var createPopupUserAuthProvider = function (stargate, mediaClientConfig) {
    var tokenData;
    return function (context) { return __awaiter(void 0, void 0, void 0, function () {
        var userAuthProvider, authProvider, clientId, _a, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userAuthProvider = mediaClientConfig.userAuthProvider;
                    if (userAuthProvider) {
                        return [2 /*return*/, userAuthProvider(context)];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    if (!(!tokenData || stargate.isTokenExpired(tokenData))) return [3 /*break*/, 4];
                    authProvider = mediaClientConfig.authProvider;
                    _a = getClientIdFromAuth;
                    return [4 /*yield*/, authProvider(context)];
                case 2:
                    clientId = _a.apply(void 0, [_b.sent()]);
                    return [4 /*yield*/, stargate.fetchToken(clientId)];
                case 3:
                    tokenData = _b.sent();
                    _b.label = 4;
                case 4: return [2 /*return*/, getAuthFromEdgeData(tokenData)];
                case 5:
                    e_1 = _b.sent();
                    throw new Error('Popup media picker Stargate call failed. If you were not intending to use Stargate you should provide userAuthProvider in the context');
                case 6: return [2 /*return*/];
            }
        });
    }); };
};
//# sourceMappingURL=popup-auth.js.map