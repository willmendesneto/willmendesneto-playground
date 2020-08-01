// We still need postis here to communicate with the "link-account-handler" iframe
import postis from 'postis';
import uuidV4 from 'uuid/v4';
import { objectToQueryString } from '@atlaskit/media-client';
import { mapAuthToQueryParameters } from '../domain/auth';
import { pickerUrl } from '../tools/fetcher/fetcher';
export class CloudService {
    constructor(userAuthProvider) {
        this.userAuthProvider = userAuthProvider;
    }
    startAuth(redirectUrl, serviceName) {
        const win = window.open('', '_blank');
        return this.userAuthProvider()
            .then(auth => {
            return new Promise(resolve => {
                const channelId = uuidV4();
                const authParams = mapAuthToQueryParameters(auth);
                const queryString = objectToQueryString({
                    ...authParams,
                    redirectUrl: `${redirectUrl}?channelId=${channelId}`,
                });
                // Electron does not support location.assign so we must use the
                // string setter to assign a new location to the window
                win.location = `${pickerUrl(auth.baseUrl)}/service/${serviceName}?${queryString}`;
                const channel = postis({
                    window: win,
                    scope: channelId,
                });
                channel.ready(() => {
                    channel.listen('auth-callback-received', () => {
                        // notify auth window to close itself
                        channel.send({ method: 'auth-callback-done', params: {} });
                        // unregister the channel listener
                        channel.destroy();
                        resolve();
                        // TODO: MSW-69 what happens if this times out?
                    });
                });
            });
        })
            .catch(e => {
            if (win) {
                win.close();
            }
            throw e;
        });
    }
}
//# sourceMappingURL=cloud-service.js.map