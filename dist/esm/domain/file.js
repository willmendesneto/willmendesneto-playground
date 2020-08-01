import { __assign } from "tslib";
export function copyMediaFileForUpload(mediaFile, fileId) {
    return __assign(__assign({}, mediaFile), { id: fileId });
}
//# sourceMappingURL=file.js.map