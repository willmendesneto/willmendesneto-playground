"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var eventemitter2_1 = require("eventemitter2");
var wsMessageData_1 = require("../wsMessageData");
var RemoteUploadActivity = /** @class */ (function () {
    function RemoteUploadActivity(tenantFileId, serviceName, dispatchEvent) {
        this.tenantFileId = tenantFileId;
        this.serviceName = serviceName;
        this.dispatchEvent = dispatchEvent;
        this.eventEmitter = new eventemitter2_1.EventEmitter2();
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
        if (wsMessageData_1.isRemoteUploadStartData(data)) {
            this.dispatchEvent('RemoteUploadStart', tslib_1.__assign({}, basePayload));
            this.notifyActivityStarted();
        }
        else if (wsMessageData_1.isRemoteUploadProgressData(data)) {
            this.dispatchEvent('RemoteUploadProgress', tslib_1.__assign({ bytes: data.currentAmount, fileSize: data.totalAmount }, basePayload));
        }
        else if (wsMessageData_1.isRemoteUploadEndData(data)) {
            this.dispatchEvent('RemoteUploadEnd', tslib_1.__assign({ userFileId: data.fileId }, basePayload));
            this.notifyActivityCompleted();
        }
        else if (wsMessageData_1.isRemoteUploadErrorData(data)) {
            this.dispatchEvent('RemoteUploadFail', tslib_1.__assign({ description: data.reason }, basePayload));
            this.notifyActivityCompleted();
        }
        else if (wsMessageData_1.isNotifyMetadata(data)) {
            this.dispatchEvent('NotifyMetadata', tslib_1.__assign({ metadata: data.metadata }, basePayload));
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
exports.RemoteUploadActivity = RemoteUploadActivity;
//# sourceMappingURL=remoteUploadActivity.js.map