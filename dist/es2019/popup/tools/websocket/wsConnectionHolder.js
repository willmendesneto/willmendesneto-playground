import { WsConnection } from './wsConnection';
// Responsible for creating a websocket connection when necessary and holding it until all activities are finished
export class WsConnectionHolder {
    constructor(auth) {
        this.auth = auth;
        this.activities = [];
        this.onActivityCompleted = (activity) => {
            const index = this.activities.indexOf(activity);
            if (index !== -1) {
                this.activities.splice(index, 1);
            }
            // Where we don't have any activities left, we should close the connection
            if (this.activities.length === 0 && this.wsConnection) {
                this.closeConnection();
            }
        };
        this.onWebSocketDataReceived = (data) => {
            this.activities.forEach(activity => {
                activity.processWebSocketData(data);
            });
        };
        this.onConnectionLost = () => {
            this.closeConnection();
        };
    }
    openConnection(activity) {
        activity.on('Completed', this.onActivityCompleted);
        this.activities.push(activity);
        if (!this.wsConnection) {
            this.wsConnection = new WsConnection(this.auth, this.onWebSocketDataReceived, this.onConnectionLost);
        }
    }
    send(data) {
        if (!this.wsConnection) {
            throw new Error('WebSocket connection has been closed');
        }
        this.wsConnection.send(data);
    }
    closeConnection() {
        this.activities.forEach(activity => {
            activity.off('Completed', this.onActivityCompleted);
            activity.connectionLost();
        });
        this.activities = [];
        if (this.wsConnection) {
            this.wsConnection.teardown();
            this.wsConnection = undefined;
        }
    }
}
//# sourceMappingURL=wsConnectionHolder.js.map