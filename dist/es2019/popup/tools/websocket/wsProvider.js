import { isClientBasedAuth } from '@atlaskit/media-core';
import { WsConnectionHolder } from './wsConnectionHolder';
// Helper class that provides a WsConnectionHolder instance for a given client.
export class WsProvider {
    constructor() {
        this.connectionHolders = {};
    }
    getWsConnectionHolder(auth) {
        const tag = WsProvider.mapAuthToTag(auth);
        const stored = this.connectionHolders[tag];
        if (stored) {
            return stored;
        }
        return this.createAndRemember(auth, tag);
    }
    createAndRemember(auth, tag) {
        const holder = new WsConnectionHolder(auth);
        this.connectionHolders[tag] = holder;
        return holder;
    }
    static mapAuthToTag(auth) {
        if (isClientBasedAuth(auth)) {
            return `${auth.clientId}-${auth.token}`;
        }
        else {
            return `${auth.asapIssuer}-${auth.token}`;
        }
    }
}
//# sourceMappingURL=wsProvider.js.map