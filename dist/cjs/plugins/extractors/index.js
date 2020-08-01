"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dateformat_1 = tslib_1.__importDefault(require("dateformat"));
exports.getImageUrl = function (data) {
    var image = data.image;
    if (!image) {
        return;
    }
    if (typeof image === 'string') {
        return image;
    }
    else if (image['@type'] === 'Image') {
        return exports.getImageUrl(image);
    }
    else if (image['@type'] === 'Link') {
        return image.href;
    }
};
exports.getResourceUrl = function (url) {
    if (url) {
        if (typeof url === 'string') {
            return url;
        }
        else if (Array.isArray(url)) {
            return exports.getResourceUrl(url[0]);
        }
        else {
            return url.href;
        }
    }
};
exports.getDateString = function (timestamp) {
    if (!timestamp) {
        return '';
    }
    var todayString = new Date().toDateString();
    var itemDate = new Date(timestamp);
    var itemDateString = itemDate.toDateString();
    return dateformat_1.default(itemDate, todayString === itemDateString ? 'H:MM TT' : 'd mmm yyyy');
};
//# sourceMappingURL=index.js.map