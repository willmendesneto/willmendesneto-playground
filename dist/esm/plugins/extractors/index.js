import dateformat from 'dateformat';
export var getImageUrl = function (data) {
    var image = data.image;
    if (!image) {
        return;
    }
    if (typeof image === 'string') {
        return image;
    }
    else if (image['@type'] === 'Image') {
        return getImageUrl(image);
    }
    else if (image['@type'] === 'Link') {
        return image.href;
    }
};
export var getResourceUrl = function (url) {
    if (url) {
        if (typeof url === 'string') {
            return url;
        }
        else if (Array.isArray(url)) {
            return getResourceUrl(url[0]);
        }
        else {
            return url.href;
        }
    }
};
export var getDateString = function (timestamp) {
    if (!timestamp) {
        return '';
    }
    var todayString = new Date().toDateString();
    var itemDate = new Date(timestamp);
    var itemDateString = itemDate.toDateString();
    return dateformat(itemDate, todayString === itemDateString ? 'H:MM TT' : 'd mmm yyyy');
};
//# sourceMappingURL=index.js.map