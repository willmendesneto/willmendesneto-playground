import { EventEmitter2 } from 'eventemitter2';
import { isNotifyMetadata, isRemoteUploadEndData, isRemoteUploadErrorData, isRemoteUploadProgressData, isRemoteUploadStartData, } from '../wsMessageData';
export class RemoteUploadActivity {
    constructor(tenantFileId, serviceName, dispatchEvent) {
        this.tenantFileId = tenantFileId;
        this.serviceName = serviceName;
        this.dispatchEvent = dispatchEvent;
        this.eventEmitter = new EventEmitter2();
    }
    processWebSocketData(data) {
        if (!this.shouldProcessWsData(data)) {
            return;
        }
        const basePayload = {
            // See description around `WsUploadMessageData.uploadId`
            tenantFileId: data.uploadId,
            serviceName: this.serviceName,
        };
        if (isRemoteUploadStartData(data)) {
            this.dispatchEvent('RemoteUploadStart', {
                ...basePayload,
            });
            this.notifyActivityStarted();
        }
        else if (isRemoteUploadProgressData(data)) {
            this.dispatchEvent('RemoteUploadProgress', {
                bytes: data.currentAmount,
                fileSize: data.totalAmount,
                ...basePayload,
            });
        }
        else if (isRemoteUploadEndData(data)) {
            this.dispatchEvent('RemoteUploadEnd', {
                userFileId: data.fileId,
                ...basePayload,
            });
            this.notifyActivityCompleted();
        }
        else if (isRemoteUploadErrorData(data)) {
            this.dispatchEvent('RemoteUploadFail', {
                description: data.reason,
                ...basePayload,
            });
            this.notifyActivityCompleted();
        }
        else if (isNotifyMetadata(data)) {
            this.dispatchEvent('NotifyMetadata', {
                metadata: data.metadata,
                ...basePayload,
            });
        }
    }
    connectionLost() {
        if (this.tenantFileId) {
            this.dispatchEvent('RemoteUploadFail', {
                tenantFileId: this.tenantFileId,
                description: 'Websocket connection lost',
                serviceName: this.serviceName,
            });
        }
    }
    on(event, handler) {
        this.eventEmitter.on(event, handler);
    }
    off(event, handler) {
        this.eventEmitter.off(event, handler);
    }
    shouldProcessWsData(data) {
        return (!!data.uploadId &&
            !!this.tenantFileId &&
            data.uploadId === this.tenantFileId);
    }
    notifyActivityStarted() {
        this.eventEmitter.emit('Started', this);
    }
    notifyActivityCompleted() {
        this.eventEmitter.emit('Completed', this);
    }
}
//# sourceMappingURL=remoteUploadActivity.js.map