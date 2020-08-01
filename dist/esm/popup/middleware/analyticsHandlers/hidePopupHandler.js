import { __assign } from "tslib";
import { isHidePopupAction } from '../../actions/hidePopup';
import { buttonClickPayload } from '.';
import { normalizeRecentFilesAge } from '../../tools/normalizeRecentFilesAge';
export default (function (action, store) {
    if (isHidePopupAction(action)) {
        var _a = store.getState().selectedItems, selectedItems = _a === void 0 ? [] : _a;
        var actionSubjectId = selectedItems.length > 0 ? 'insertFilesButton' : 'cancelButton';
        var files = actionSubjectId === 'insertFilesButton'
            ? selectedItems.map(function (item) { return (__assign({ fileId: item.id, fileMimetype: item.mimeType, fileSize: item.size, accountId: item.accountId, serviceName: item.serviceName }, (item.serviceName === 'recent_files'
                ? { fileAge: normalizeRecentFilesAge(item.createdAt) }
                : {}))); })
            : [];
        var serviceNames = selectedItems.length > 0
            ? {
                serviceNames: selectedItems.map(function (i) { return i.serviceName; }),
            }
            : {};
        return [
            __assign(__assign({}, buttonClickPayload), { actionSubjectId: actionSubjectId, attributes: __assign(__assign({ fileCount: selectedItems.length }, serviceNames), (actionSubjectId === 'insertFilesButton' ? { files: files } : {})) }),
        ];
    }
});
//# sourceMappingURL=hidePopupHandler.js.map