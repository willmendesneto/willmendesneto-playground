import * as url from 'url';
import { mapAuthToAuthHeaders } from '../../domain/auth';
const giphyApiKey = 'lBOxhhz1BM62Y3JsK0iQv1pRYyOGUjR8';
const toJson = (response) => response.json();
export class MediaApiFetcher {
    constructor() {
        this.fetchTrendingGifs = (offset) => {
            const baseUrl = 'https://api.giphy.com/v1/gifs/trending';
            const params = {
                api_key: giphyApiKey,
                rating: 'pg',
                offset,
            };
            const url = `${baseUrl}${this.stringifyParams(params)}`;
            return fetch(url)
                .then(toJson)
                .then(this.mapGiphyResponseToViewModel);
        };
        this.fetchGifsRelevantToSearch = (query, offset) => {
            const baseUrl = 'https://api.giphy.com/v1/gifs/search';
            const params = {
                api_key: giphyApiKey,
                rating: 'pg',
                q: query,
                offset,
            };
            const url = `${baseUrl}${this.stringifyParams(params)}`;
            return fetch(url)
                .then(toJson)
                .then(this.mapGiphyResponseToViewModel);
        };
        this.mapGiphyResponseToViewModel = (response) => {
            const { data, pagination } = response;
            const cardModels = data.map(gif => {
                const { id, slug } = gif;
                const { size, url, width, height } = gif.images.fixed_width;
                const name = slug.replace(new RegExp(`-${id}`), '');
                const metadata = {
                    id,
                    name,
                    mediaType: 'image',
                    size: parseInt(size, 10),
                };
                return {
                    metadata,
                    dataURI: url,
                    dimensions: {
                        width: parseInt(width, 10),
                        height: parseInt(height, 10),
                    },
                };
            });
            return {
                cardModels,
                totalResultCount: pagination.total_count,
            };
        };
    }
    fetchCloudAccountFolder(auth, serviceName, accountId, folderId, cursor) {
        return this.query(`${pickerUrl(auth.baseUrl)}/service/${serviceName}/${accountId}/folder`, 'GET', {
            folderId,
            limit: 100,
            cursor,
        }, mapAuthToAuthHeaders(auth))
            .then(toJson)
            .then(({ data: serviceFolder }) => {
            if (serviceName === 'dropbox') {
                return {
                    ...serviceFolder,
                    items: this.sortDropboxFiles(serviceFolder.items),
                };
            }
            else {
                return serviceFolder;
            }
        });
    }
    getServiceList(auth) {
        return this.query(`${pickerUrl(auth.baseUrl)}/accounts`, 'GET', {}, mapAuthToAuthHeaders(auth))
            .then(toJson)
            .then(({ data: services }) => flattenAccounts(services));
    }
    unlinkCloudAccount(auth, accountId) {
        return this.query(`${pickerUrl(auth.baseUrl)}/account/${accountId}`, 'DELETE', {}, mapAuthToAuthHeaders(auth)).then(() => { });
    }
    stringifyParams(queryParams) {
        const keys = Object.keys(queryParams);
        if (!keys.length) {
            return '';
        }
        const stringifiedParams = keys
            .map(key => {
            const value = queryParams[key];
            return value !== undefined ? `${key}=${value}` : undefined;
        })
            .filter(key => !!key)
            .join('&');
        return `?${stringifiedParams}`;
    }
    query(baseUrl, method, payload, authHeaders) {
        const contentType = 'application/json; charset=utf-8';
        const headers = new Headers({
            ...authHeaders,
            'Content-Type': contentType,
        });
        const params = method === 'GET' ? this.stringifyParams(payload) : '';
        const body = method !== 'GET' ? JSON.stringify(payload) : undefined;
        const url = `${baseUrl}${params}`;
        const request = new Request(url, {
            method,
            headers,
            body,
        });
        return fetch(request);
    }
    isFolder(item) {
        return item.mimeType === 'application/vnd.atlassian.mediapicker.folder';
    }
    sortDropboxFiles(items) {
        return items.sort((a, b) => {
            const isAFolder = this.isFolder(a);
            const isBFolder = this.isFolder(b);
            if (!isAFolder && isBFolder) {
                return 1;
            }
            if (isAFolder && !isBFolder) {
                return -1;
            }
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            if (aName > bName) {
                return 1;
            }
            else if (aName < bName) {
                return -1;
            }
            else {
                return 0;
            }
        });
    }
}
export const fileStoreUrl = (baseUrl) => {
    const { protocol, host } = url.parse(baseUrl);
    return `${protocol}//${host}`;
};
export const pickerUrl = (baseUrl) => {
    return `${fileStoreUrl(baseUrl)}/picker`;
};
export function flattenAccounts(services) {
    return services.reduce((accounts, service) => accounts.concat(service.accounts.map(account => ({
        ...account,
        type: service.type,
    }))), new Array());
}
//# sourceMappingURL=fetcher.js.map