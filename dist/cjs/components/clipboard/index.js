"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var ClipboardLoader = /** @class */ (function (_super) {
    tslib_1.__extends(ClipboardLoader, _super);
    function ClipboardLoader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            Clipboard: ClipboardLoader.Clipboard,
        };
        return _this;
    }
    ClipboardLoader.prototype.UNSAFE_componentWillMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, mediaClient, clipboardModule;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.state.Clipboard) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all([
                                Promise.resolve().then(function () { return tslib_1.__importStar(require(
                                /* webpackChunkName:"@atlaskit-media-client" */ '@atlaskit/media-client')); }),
                                Promise.resolve().then(function () { return tslib_1.__importStar(require(
                                /* webpackChunkName:"@atlaskit-internal_Clipboard" */ './clipboard')); }),
                            ])];
                    case 1:
                        _a = tslib_1.__read.apply(void 0, [_b.sent(), 2]), mediaClient = _a[0], clipboardModule = _a[1];
                        ClipboardLoader.Clipboard = mediaClient.withMediaClient(clipboardModule.Clipboard);
                        this.setState({
                            Clipboard: ClipboardLoader.Clipboard,
                        });
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ClipboardLoader.prototype.render = function () {
        if (!this.state.Clipboard) {
            return null;
        }
        return react_1.default.createElement(this.state.Clipboard, tslib_1.__assign({}, this.props));
    };
    ClipboardLoader.displayName = 'AsyncClipboard';
    return ClipboardLoader;
}(react_1.default.PureComponent));
exports.ClipboardLoader = ClipboardLoader;
//# sourceMappingURL=index.js.map