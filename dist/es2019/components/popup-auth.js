import jwtDecode from 'jwt-decode';
import { isClientBasedAuth, } from '@atlaskit/media-core';
const getAuthFromEdgeData = (response) => ({
    clientId: response.data.clientId,
    token: response.data.token,
    baseUrl: response.data.baseUrl,
});
const getClientIdFromAuth = (auth) => {
    if (isClientBasedAuth(auth)) {
        return auth.clientId;
    }
    const tokenData = jwtDecode(auth.token);
    return tokenData.clientId;
};
export const createPopupUserAuthProvider = (stargate, mediaClientConfig) => {
    let tokenData;
    return async (context) => {
        const { userAuthProvider } = mediaClientConfig;
        if (userAuthProvider) {
            return userAuthProvider(context);
        }
        try {
            if (!tokenData || stargate.isTokenExpired(tokenData)) {
                const { authProvider } = mediaClientConfig;
                const clientId = getClientIdFromAuth(await authProvider(context));
                tokenData = await stargate.fetchToken(clientId);
            }
            return getAuthFromEdgeData(tokenData);
        }
        catch (e) {
            throw new Error('Popup media picker Stargate call failed. If you were not intending to use Stargate you should provide userAuthProvider in the context');
        }
    };
};
//# sourceMappingURL=popup-auth.js.map