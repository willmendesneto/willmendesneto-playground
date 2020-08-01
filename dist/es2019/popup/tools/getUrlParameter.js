export function getUrlParameter(name, searchOverride) {
    const search = searchOverride || location.search;
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(search);
    return results === null
        ? undefined
        : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
export function getRequiredUrlParameter(name, searchOverride) {
    const result = getUrlParameter(name, searchOverride);
    if (result) {
        return result;
    }
    else {
        throw new Error(`Could not get required url parameter: ${name}`);
    }
}
//# sourceMappingURL=getUrlParameter.js.map