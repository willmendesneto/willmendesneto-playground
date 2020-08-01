const NON_TENANT_API_ENDPOINT = 'https://api-private.stg.atlassian.com/object-resolver';
const TENANT_HOST_REGEX = [
    /^https:\/\/([^\.]*\.)*atl-paas\.net/,
    /^https:\/\/([^\.]*\.)*atlassian\.net/,
    /^https:\/\/([^\.]*\.)*jira-dev\.com/,
    /^https:\/\/([^\.]*\.)*jira\.com/,
    /^https:\/\/bitbucket\.org/,
];
const isServerError = (response) => {
    return !!response.message;
};
export class ForgeClient {
    constructor() {
        this.getProviders = async () => {
            const response = await this.fetch('providers', {
                type: 'search',
            });
            return response;
        };
        this.fetch = async (endpoint, body) => {
            const response = await fetch(`${this.getApiEndpoint()}/${endpoint}`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error((await response.text()) || response.statusText);
            }
            const payload = await response.json();
            if (isServerError(payload)) {
                throw new Error(payload.message);
            }
            return payload;
        };
    }
    getApiEndpoint() {
        for (const regex of TENANT_HOST_REGEX) {
            if (regex.test(window.location.origin)) {
                return `${window.location.origin}/gateway/api/object-resolver`;
            }
        }
        return NON_TENANT_API_ENDPOINT;
    }
    async invokeProvider(extensionKey, params) {
        const { query = '', folderId } = params;
        const context = folderId ? { id: folderId } : undefined;
        const request = {
            key: extensionKey,
            search: {
                query,
                context,
            },
        };
        const response = await this.fetch('invoke/search', request);
        return response;
    }
}
//# sourceMappingURL=client.js.map