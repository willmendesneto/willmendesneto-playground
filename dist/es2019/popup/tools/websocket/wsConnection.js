import { Ws } from './ws';
// Contains retry logic to establish the websocket connection
//
// If no data was received within 3 minutes, the connection is reported as lost.
export class WsConnection {
    constructor(auth, onDataReceived, onConnectionLost) {
        this.auth = auth;
        this.onDataReceived = onDataReceived;
        this.onConnectionLost = onConnectionLost;
        this.retriesRemaining = 10;
        this.openWs = () => {
            const timeout = 1000; // msec
            try {
                window.clearTimeout(this.retryTimeoutId);
                this.ws = new Ws(this.auth, this.wsDataReceived, this.onConnectionLost);
                this.resetIdleTimeout();
            }
            catch (error) {
                // Could not create a web socket
                --this.retriesRemaining;
                if (this.retriesRemaining > 0) {
                    // Retry after a timeout
                    this.retryTimeoutId = window.setTimeout(this.openWs, timeout);
                }
                else {
                    // No more retries
                    this.teardown();
                    this.onConnectionLost();
                }
            }
        };
        this.wsDataReceived = (data) => {
            this.resetIdleTimeout();
            this.onDataReceived(data);
        };
        this.resetIdleTimeout = () => {
            // if we don't receive a message from the WebSocket after 3 minutes we close it
            const idleTimeout = 3 * 60 * 1000;
            window.clearTimeout(this.idleTimeoutId);
            this.idleTimeoutId = window.setTimeout(this.onIdle, idleTimeout);
        };
        this.onIdle = () => {
            window.clearTimeout(this.idleTimeoutId);
            this.onConnectionLost();
        };
        this.openWs();
    }
    teardown() {
        if (this.ws) {
            this.ws.teardown();
            this.ws = undefined;
        }
        window.clearTimeout(this.retryTimeoutId);
        window.clearTimeout(this.idleTimeoutId);
        this.retriesRemaining = 0;
    }
    send(data) {
        if (!this.ws) {
            throw new Error('WebSocket connection has been closed');
        }
        this.ws.send(data);
    }
}
//# sourceMappingURL=wsConnection.js.map