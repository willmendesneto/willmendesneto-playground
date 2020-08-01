import { __assign } from "tslib";
import { EventEmitter2 } from 'eventemitter2';
import { isNotifyMetadata, isRemoteUploadEndData, isRemoteUploadErrorData, isRemoteUploadProgressData, isRemoteUploadStartData, } from '../wsMessageData';
var RemoteUploadActivity = /** @class */ (function () {
    function RemoteUploadActivity(tenantFileId, serviceName, dispatchEvent) {
        this.tenantFileId = tenantFileId;
        this.serviceName = serviceName;
        this.dispatchEvent = dispatchEvent;
        this.eventEmitter = new EventEmitter2();
    }
    RemoteUploadActivity.prototype.processWebSocketData = function (data) {
        if (!this.shouldProcessWsData(data)) {
            return;
        }
        var basePayload = {
            // See description around `WsUploadMessageData.uploadId`
            tenantFileId: data.uploadId,
            serviceName: this.serviceName,
        };
        if (isRemoteUploadStartData(data)) {
            this.dispatchEvent('RemoteUploadStart', __assign({}, basePayload));
            this.notifyActivityStarted();
        }
        else if (isRemoteUploadProgressData(data)) {
            this.dispatchEvent('RemoteUploadProgress', __assign({ bytes: data.currentAmount, fileSize: data.totalAmount }, basePayload));
        }
        else if (isRemoteUploadEndData(data)) {
            this.dispatchEvent('RemoteUploadEnd', __assign({ userFileId: data.fileId }, basePayload));
            this.notifyActivityCompleted();
        }
        else if (isRemoteUploadErrorData(data)) {
            this.dispatchEvent('RemoteUploadFail', __assign({ description: data.reason }, basePayload));
            this.notifyActivityCompleted();
        }
        else if (isNotifyMetadata(data)) {
            this.dispatchEvent('NotifyMetadata', __assign({ metadata: data.metadata }, basePayload));
        }
    };
    RemoteUploadActivity.prototype.connectionLost = function () {
        if (this.tenantFileId) {
            this.dispatchEvent('RemoteUploadFail', {
                tenantFileId: this.tenantFileId,
                description: 'Websocket connection lost',
                serviceName: this.serviceName,
            });
        }
    };
    RemoteUploadActivity.prototype.on = function (event, handler) {
        this.eventEmitter.on(event, handler);
    };
    RemoteUploadActivity.prototype.off = function (event, handler) {
        this.eventEmitter.off(event, handler);
    };
    RemoteUploadActivity.prototype.shouldProcessWsData = function (data) {
        return (!!data.uploadId &&
            !!this.tenantFileId &&
            data.uploadId === this.tenantFileId);
    };
    RemoteUploadActivity.prototype.notifyActivityStarted = function () {
        this.eventEmitter.emit('Started', this);
    };
    RemoteUploadActivity.prototype.notifyActivityCompleted = function () {
        this.eventEmitter.emit('Completed', this);
    };
    return RemoteUploadActivity;
}());
export { RemoteUploadActivity };
//# sourceMappingURL=remoteUploadActivity.js.map