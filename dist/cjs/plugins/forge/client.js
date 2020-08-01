"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NON_TENANT_API_ENDPOINT = 'https://api-private.stg.atlassian.com/object-resolver';
var TENANT_HOST_REGEX = [
    /^https:\/\/([^\.]*\.)*atl-paas\.net/,
    /^https:\/\/([^\.]*\.)*atlassian\.net/,
    /^https:\/\/([^\.]*\.)*jira-dev\.com/,
    /^https:\/\/([^\.]*\.)*jira\.com/,
    /^https:\/\/bitbucket\.org/,
];
var isServerError = function (response) {
    return !!response.message;
};
var ForgeClient = /** @class */ (function () {
    function ForgeClient() {
        var _this = this;
        this.getProviders = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch('providers', {
                            type: 'search',
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        }); };
        this.fetch = function (endpoint, body) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var response, _a, payload;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch(this.getApiEndpoint() + "/" + endpoint, {
                            method: 'POST',
                            credentials: 'include',
                            body: JSON.stringify(body),
                            headers: {
                                'content-type': 'application/json',
                            },
                        })];
                    case 1:
                        response = _b.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        _a = Error.bind;
                        return [4 /*yield*/, response.text()];
                    case 2: throw new (_a.apply(Error, [void 0, (_b.sent()) || response.statusText]))();
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        payload = _b.sent();
                        if (isServerError(payload)) {
                            throw new Error(payload.message);
                        }
                        return [2 /*return*/, payload];
                }
            });
        }); };
    }
    ForgeClient.prototype.getApiEndpoint = function () {
        var e_1, _a;
        try {
            for (var TENANT_HOST_REGEX_1 = tslib_1.__values(TENANT_HOST_REGEX), TENANT_HOST_REGEX_1_1 = TENANT_HOST_REGEX_1.next(); !TENANT_HOST_REGEX_1_1.done; TENANT_HOST_REGEX_1_1 = TENANT_HOST_REGEX_1.next()) {
                var regex = TENANT_HOST_REGEX_1_1.value;
                if (regex.test(window.location.origin)) {
                    return window.location.origin + "/gateway/api/object-resolver";
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (TENANT_HOST_REGEX_1_1 && !TENANT_HOST_REGEX_1_1.done && (_a = TENANT_HOST_REGEX_1.return)) _a.call(TENANT_HOST_REGEX_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return NON_TENANT_API_ENDPOINT;
    };
    ForgeClient.prototype.invokeProvider = function (extensionKey, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, query, folderId, context, request, response;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = params.query, query = _a === void 0 ? '' : _a, folderId = params.folderId;
                        context = folderId ? { id: folderId } : undefined;
                        request = {
                            key: extensionKey,
                            search: {
                                query: query,
                                context: context,
                            },
                        };
                        return [4 /*yield*/, this.fetch('invoke/search', request)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return ForgeClient;
}());
exports.ForgeClient = ForgeClient;
//# sourceMappingURL=client.js.map