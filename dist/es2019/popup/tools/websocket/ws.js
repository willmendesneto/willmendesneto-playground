import * as url from 'url';
import { objectToQueryString } from '@atlaskit/media-client';
import { randomInt } from '../randomInt';
import { mapAuthToQueryParameters } from '../../domain/auth';
// Helper function that formats websocket URL based on API URL
export const getWsUrl = (baseUrl) => {
    const urlParams = url.parse(baseUrl);
    const { protocol, host } = urlParams;
    const wsProtocol = protocol === 'http:' ? 'ws:' : 'wss:';
    return `${wsProtocol}//${host}/picker/ws/`;
};
// Wraps WebSocket instance.
// The constructor can throw an error.
//
// You should call teardown() when you're done with the object of this class.
//
// Internally pings the websocket periodically. If the connection is lost, calls onConnectionLost.
// In this case you don't have to call teardown(), however calling teardown() twice doesn't cause an error.
export class Ws {
    constructor(auth, onDataReceived, onConnectionLost) {
        this.onDataReceived = onDataReceived;
        this.onConnectionLost = onConnectionLost;
        this.teardown = () => {
            window.clearTimeout(this.pingTimeoutId);
            this.ws.close();
        };
        this.send = (data) => {
            const ws = this.ws;
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify(data));
            }
            else if (ws.readyState === ws.CONNECTING) {
                const listener = () => {
                    ws.removeEventListener('open', listener);
                    ws.send(JSON.stringify(data));
                };
                ws.addEventListener('open', listener);
            }
        };
        this.schedulePing = () => {
            // Intervals for ping in milliseconds
            const minInterval = 25 * 1000;
            const maxInterval = 35 * 1000;
            const interval = randomInt(minInterval, maxInterval);
            window.clearTimeout(this.pingTimeoutId);
            this.pingTimeoutId = window.setTimeout(this.ping, interval);
        };
        this.ping = () => {
            if (this.isWebSocketClosed()) {
                this.teardown();
                this.onConnectionLost();
                return;
            }
            this.sendHeartBeat();
            this.schedulePing();
        };
        this.isWebSocketClosed = () => {
            return this.ws.readyState === this.ws.CLOSED;
        };
        this.sendHeartBeat = () => {
            if (this.ws.readyState === this.ws.OPEN) {
                this.ws.send('');
            }
        };
        this.setHandler = () => {
            this.ws.onmessage = (message) => {
                const resp = JSON.parse(message.data);
                this.onDataReceived(resp);
            };
        };
        const wsUrl = getWsUrl(auth.baseUrl);
        // WebSocket throws an exception SECURITY_ERR if the port is blocked.
        // https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
        const authParams = mapAuthToQueryParameters(auth);
        this.ws = new WebSocket(`${wsUrl}?${objectToQueryString(authParams)}`);
        this.setHandler();
        this.schedulePing();
    }
}
//# sourceMappingURL=ws.js.map