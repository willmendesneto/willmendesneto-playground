import dateformat from 'dateformat';
export const getImageUrl = (data) => {
    const image = data.image;
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
export const getResourceUrl = (url) => {
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
export const getDateString = (timestamp) => {
    if (!timestamp) {
        return '';
    }
    const todayString = new Date().toDateString();
    const itemDate = new Date(timestamp);
    const itemDateString = itemDate.toDateString();
    return dateformat(itemDate, todayString === itemDateString ? 'H:MM TT' : 'd mmm yyyy');
};
//# sourceMappingURL=index.js.map