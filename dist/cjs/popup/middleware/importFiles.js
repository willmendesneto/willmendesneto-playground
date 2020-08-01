"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var v4_1 = tslib_1.__importDefault(require("uuid/v4"));
var media_client_1 = require("@atlaskit/media-client");
var constants_1 = require("@atlaskit/media-client/constants");
var startImport_1 = require("../actions/startImport");
var finalizeUpload_1 = require("../actions/finalizeUpload");
var remoteUploadStart_1 = require("../actions/remoteUploadStart");
var getPreview_1 = require("../actions/getPreview");
var handleCloudFetchingEvent_1 = require("../actions/handleCloudFetchingEvent");
var hidePopup_1 = require("../actions/hidePopup");
var resetView_1 = require("../actions/resetView");
var remoteUploadActivity_1 = require("../tools/websocket/upload/remoteUploadActivity");
var file_1 = require("../../domain/file");
var sendUploadEvent_1 = require("../actions/sendUploadEvent");
var preview_1 = require("../../domain/preview");
var getPreviewFromBlob_1 = require("../../util/getPreviewFromBlob");
exports.isRemoteFileItem = function (item) {
    return ['dropbox', 'google', 'giphy'].indexOf(item.serviceName) !== -1;
};
exports.isRemoteService = function (serviceName) {
    return ['dropbox', 'google', 'giphy'].indexOf(serviceName) !== -1;
};
var mapSelectedItemToSelectedUploadFile = function (_a, tenantFileId, collection) {
    var id = _a.id, name = _a.name, mimeType = _a.mimeType, size = _a.size, date = _a.date, serviceName = _a.serviceName, accountId = _a.accountId, _b = _a.occurrenceKey, occurrenceKey = _b === void 0 ? v4_1.default() : _b;
    return ({
        file: {
            id: id,
            name: name,
            size: size,
            creationDate: date || Date.now(),
            type: mimeType,
            occurrenceKey: occurrenceKey,
        },
        serviceName: serviceName,
        accountId: accountId,
        touchFileDescriptor: {
            fileId: tenantFileId,
            occurrenceKey: occurrenceKey,
            collection: collection,
        },
    });
};
function importFilesMiddleware(eventEmitter, wsProvider) {
    return function (store) { return function (next) { return function (action) {
        if (startImport_1.isStartImportAction(action)) {
            importFiles(eventEmitter, store, wsProvider);
        }
        return next(action);
    }; }; };
}
exports.importFilesMiddleware = importFilesMiddleware;
var getRemotePreview = function (store, fileId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var userMediaClient, blob;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userMediaClient = store.getState().userMediaClient;
                return [4 /*yield*/, userMediaClient.getImage(fileId, {
                        collection: constants_1.RECENTS_COLLECTION,
                        mode: 'fit',
                    }, undefined, true)];
            case 1:
                blob = _a.sent();
                return [2 /*return*/, { value: blob, origin: 'remote' }];
        }
    });
}); };
var getPreviewByService = function (store, serviceName, mediaType, fileId) {
    if (serviceName === 'giphy') {
        var giphy = store.getState().giphy;
        var selectedGiphy = giphy.imageCardModels.find(function (cardModel) { return cardModel.metadata.id === fileId; });
        if (selectedGiphy) {
            return Promise.resolve({
                value: selectedGiphy.dataURI,
                origin: 'remote',
            });
        }
    }
    else if (serviceName === 'upload') {
        var observable_1 = media_client_1.getFileStreamsCache().get(fileId);
        if (observable_1) {
            return new Promise(function (resolve, reject) {
                return observable_1.subscribe({
                    next: function (state) {
                        if (media_client_1.isPreviewableFileState(state)) {
                            // We only want to resolve defined state.preview, even though
                            // TS allows resolve with undefined.
                            this.unsubscribe();
                            return resolve(state.preview);
                        }
                        if (media_client_1.isFinalFileState(state)) {
                            this.unsubscribe();
                            return media_client_1.isImageRepresentationReady(state)
                                ? resolve(getRemotePreview(store, fileId))
                                : reject(new Error('File has no image representation'));
                        }
                    },
                });
            });
        }
    }
    else if (serviceName === 'recent_files' && media_client_1.isPreviewableType(mediaType)) {
        // TODO, EDM-674: handle case where recent file is an image/video and has failed processing
        return getRemotePreview(store, fileId);
    }
    return undefined;
};
/**
 * Take selected file (that can be local uploads, recents or remote file (giphy, google, dropbox))
 * and convert it to FileState that will become tenant file state.
 * If selected file already in the cache (for local uploads and recents) we take everything it has, change it's id
 * to new tenant id (generated on client side) and add a preview.
 * If selected file is not in the cache (for remote selected files) we generate new file state
 * with details found in selected file.
 */
exports.getTenantFileState = function (store, selectedUploadFile) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var selectedUserFile, serviceName, touchFileDescriptor, tenantFileId, tenantOccurrenceKey, selectedUserFileId, mediaType, preview, userFileObservable, userFileState;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                selectedUserFile = selectedUploadFile.file, serviceName = selectedUploadFile.serviceName, touchFileDescriptor = selectedUploadFile.touchFileDescriptor;
                tenantFileId = touchFileDescriptor.fileId, tenantOccurrenceKey = touchFileDescriptor.occurrenceKey;
                selectedUserFileId = selectedUserFile.id;
                mediaType = media_client_1.getMediaTypeFromMimeType(selectedUserFile.type);
                preview = getPreviewByService(store, serviceName, mediaType, selectedUserFileId);
                userFileObservable = media_client_1.getFileStreamsCache().get(selectedUserFileId);
                if (!userFileObservable) return [3 /*break*/, 2];
                return [4 /*yield*/, media_client_1.observableToPromise(userFileObservable)];
            case 1:
                userFileState = _a.sent();
                if (media_client_1.isErrorFileState(userFileState)) {
                    return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, userFileState), { id: tenantFileId })];
                }
                if (!media_client_1.isProcessedFileState(userFileState)) {
                    // we don't create the tenant FileState from a "processed" user fileState
                    // to not inherit the user artfifacts that we couldn't access later on
                    return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, userFileState), { id: tenantFileId, mediaType: mediaType,
                            preview: preview })];
                }
                _a.label = 2;
            case 2: return [2 /*return*/, {
                    id: tenantFileId,
                    occurrenceKey: tenantOccurrenceKey,
                    status: 'processing',
                    mediaType: mediaType,
                    mimeType: selectedUserFile.type,
                    name: selectedUserFile.name,
                    size: selectedUserFile.size,
                    preview: preview,
                    representations: {},
                }];
        }
    });
}); };
/**
 * Add tenant state to the cache and then emit this state to everyone who is listening on
 * 1. mediaClient even-emitter interface (mediaClient.on()).
 *  Note: There shouldn't be anyone listening here atm. This will be removed as soon as we remove Context API.
 * 2. globalMediaEventEmitter even-emitter interface.
 *  Note: This is different from `mediaPicker.on()` event-emitter interface!
 */
var distributeTenantFileState = function (tenantFileState, userSelectedFileId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var tenantFileSubject, userFileObservable;
    return tslib_1.__generator(this, function (_a) {
        tenantFileSubject = media_client_1.createFileStateSubject();
        userFileObservable = media_client_1.getFileStreamsCache().get(userSelectedFileId);
        media_client_1.getFileStreamsCache().set(tenantFileState.id, tenantFileSubject);
        tenantFileSubject.next(tenantFileState);
        if (userFileObservable) {
            userFileObservable.subscribe({
                next: function (latestUserFileState) {
                    // let's not inherit a "processed" user fileState
                    // to not inherit the user artfifacts that we couldn't access later on
                    if (media_client_1.isProcessedFileState(latestUserFileState)) {
                        return;
                    }
                    var overrides = !media_client_1.isErrorFileState(tenantFileState)
                        ? {
                            mediaType: tenantFileState.mediaType,
                            preview: tenantFileState.preview,
                        }
                        : {};
                    tenantFileSubject.next(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, latestUserFileState), overrides), { id: tenantFileState.id }));
                },
            });
        }
        return [2 /*return*/];
    });
}); };
/**
 * We call `/upload/createWithFiles` (touch) endpoint to create an empty file with client side
 * generated file ID that we use here as tenant file id.
 */
exports.touchSelectedFile = function (touchFileDescriptor, store) {
    var _a = store.getState(), tenantMediaClient = _a.tenantMediaClient, config = _a.config;
    var tenantCollection = config.uploadParams && config.uploadParams.collection;
    return tenantMediaClient.file.touchFiles([touchFileDescriptor], tenantCollection);
};
var isKnowServiceName = function (_a) {
    var serviceName = _a.serviceName;
    return ['recent_files', 'google', 'dropbox', 'upload', 'giphy'].indexOf(serviceName) > -1;
};
function importFiles(eventEmitter, store, wsProvider) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, uploads, selectedItems, userMediaClient, config, tenantCollection, selectedPluginItems, userAuth, selectedUploadFiles;
        var _this = this;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = store.getState(), uploads = _a.uploads, selectedItems = _a.selectedItems, userMediaClient = _a.userMediaClient, config = _a.config;
                    tenantCollection = config.uploadParams && config.uploadParams.collection;
                    store.dispatch(hidePopup_1.hidePopup());
                    selectedPluginItems = selectedItems.filter(function (item) { return !isKnowServiceName(item); });
                    return [4 /*yield*/, userMediaClient.config.authProvider()];
                case 1:
                    userAuth = _b.sent();
                    selectedUploadFiles = selectedItems
                        .filter(isKnowServiceName)
                        .map(function (item) {
                        var tenantFileId = v4_1.default();
                        return mapSelectedItemToSelectedUploadFile(item, tenantFileId, tenantCollection);
                    });
                    eventEmitter.emitPluginItemsInserted(selectedPluginItems);
                    return [4 /*yield*/, Promise.all(selectedUploadFiles.map(function (selectedUploadFile) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var tenantFileState, userSelectedFileId;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, exports.getTenantFileState(store, selectedUploadFile)];
                                    case 1:
                                        tenantFileState = _a.sent();
                                        userSelectedFileId = selectedUploadFile.file.id;
                                        // 2. We store them to the cache and notify all listeners of global event emitter
                                        distributeTenantFileState(tenantFileState, userSelectedFileId);
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _b.sent();
                    // 3. We notify all listeners of mediaPicker event emitter about 'uploads-start' event
                    eventEmitter.emitUploadsStart(selectedUploadFiles.map(function (_a) {
                        var file = _a.file, touchFileDescriptor = _a.touchFileDescriptor;
                        return file_1.copyMediaFileForUpload(file, touchFileDescriptor.fileId);
                    }));
                    // 4. Now, when empty file was created we can do all the necessary uploading/copy operations
                    // TODO here we don't have actually guarantee that empty file was created.
                    // https://product-fabric.atlassian.net/browse/MS-2165
                    selectedUploadFiles.forEach(function (selectedUploadFile) {
                        var file = selectedUploadFile.file, serviceName = selectedUploadFile.serviceName;
                        var selectedItemId = file.id;
                        if (serviceName === 'upload') {
                            var localUpload = uploads[selectedItemId];
                            importFilesFromLocalUpload(selectedUploadFile, store, localUpload);
                        }
                        else if (serviceName === 'recent_files') {
                            importFilesFromRecentFiles(selectedUploadFile, store);
                        }
                        else if (exports.isRemoteService(serviceName)) {
                            var wsConnectionHolder = wsProvider.getWsConnectionHolder(userAuth);
                            importFilesFromRemoteService(selectedUploadFile, store, wsConnectionHolder);
                        }
                    });
                    store.dispatch(resetView_1.resetView());
                    return [2 /*return*/];
            }
        });
    });
}
exports.importFiles = importFiles;
var fileStateToMediaFile = function (fileState) {
    var id = fileState.id, name = fileState.name, size = fileState.size, mimeType = fileState.mimeType, occurrenceKey = fileState.occurrenceKey;
    return {
        id: id,
        creationDate: -1,
        name: name,
        size: size,
        type: mimeType,
        occurrenceKey: occurrenceKey,
    };
};
var emitPublicEvents = function (selectedUploadFile, store, localUpload) {
    var fileId = selectedUploadFile.touchFileDescriptor.fileId;
    var tenantMediaClient = store.getState().tenantMediaClient;
    var publicEventEmissionState = {
        'upload-preview-update': 'unsent',
        'upload-error': 'unsent',
        'upload-end': 'unsent',
    };
    var pendingEvents = {
        'upload-end': undefined,
    };
    var dispatchUploadError = function (fileState) {
        var id = fileState.id, _a = fileState.message, message = _a === void 0 ? '' : _a;
        var event = {
            name: 'upload-error',
            data: {
                error: {
                    fileId: id,
                    description: message,
                    name: 'upload_fail',
                },
                fileId: id,
            },
        };
        store.dispatch(sendUploadEvent_1.sendUploadEvent({ event: event, fileId: fileId }));
    };
    var dispatchUploadPreviewUpdate = function (fileState, value) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mediaType, file, preview, _a, event;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    mediaType = fileState.mediaType;
                    file = fileStateToMediaFile(fileState);
                    if (!(value instanceof Blob)) return [3 /*break*/, 2];
                    return [4 /*yield*/, getPreviewFromBlob_1.getPreviewFromBlob(value, mediaType)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = {};
                    _b.label = 3;
                case 3:
                    preview = _a;
                    event = {
                        name: 'upload-preview-update',
                        data: {
                            file: file,
                            preview: preview,
                        },
                    };
                    store.dispatch(sendUploadEvent_1.sendUploadEvent({ event: event, fileId: fileId }));
                    return [2 /*return*/];
            }
        });
    }); };
    var dispatchUploadEnd = function (fileState) {
        var file = fileStateToMediaFile(fileState);
        // File to copy from
        var source = {
            id: localUpload.file.metadata.id,
            collection: constants_1.RECENTS_COLLECTION,
        };
        store.dispatch(finalizeUpload_1.finalizeUpload(file, fileId, source));
    };
    var canDispatchUploadPreview = function () {
        return publicEventEmissionState['upload-preview-update'] === 'unsent';
    };
    var canDispatchUploadEnd = function (fileState) {
        return ['processing', 'processed', 'failed-processing'].includes(fileState.status) && publicEventEmissionState['upload-end'] === 'unsent';
    };
    var canUnsubscribe = function () {
        // we can unsubscribe when all events are fired
        return publicEventEmissionState['upload-preview-update'] !== 'unsent' &&
            publicEventEmissionState['upload-end'] !== 'unsent';
    };
    var dispatchPendingEvents = function () {
        if (pendingEvents['upload-end'] &&
            publicEventEmissionState['upload-preview-update'] === 'sent') {
            pendingEvents['upload-end']();
            delete pendingEvents['upload-end'];
        }
    };
    tenantMediaClient.file.getFileState(fileId).subscribe({
        next: function (fileState) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var preview, mimeType, value, err_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (media_client_1.isErrorFileState(fileState)) {
                                if (publicEventEmissionState['upload-error'] !== 'sent') {
                                    dispatchUploadError(fileState);
                                    publicEventEmissionState['upload-error'] = 'sent';
                                }
                                return [2 /*return*/];
                            }
                            preview = fileState.preview, mimeType = fileState.mimeType;
                            if (!(canDispatchUploadPreview() &&
                                !media_client_1.isMimeTypeSupportedByBrowser(mimeType))) return [3 /*break*/, 2];
                            publicEventEmissionState['upload-preview-update'] = 'sending';
                            return [4 /*yield*/, dispatchUploadPreviewUpdate(fileState)];
                        case 1:
                            _a.sent();
                            publicEventEmissionState['upload-preview-update'] = 'sent';
                            _a.label = 2;
                        case 2:
                            if (!preview) return [3 /*break*/, 8];
                            value = void 0;
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, preview];
                        case 4:
                            value = (_a.sent()).value;
                            return [3 /*break*/, 6];
                        case 5:
                            err_1 = _a.sent();
                            value = undefined;
                            return [3 /*break*/, 6];
                        case 6:
                            if (!canDispatchUploadPreview()) return [3 /*break*/, 8];
                            publicEventEmissionState['upload-preview-update'] = 'sending';
                            return [4 /*yield*/, dispatchUploadPreviewUpdate(fileState, value)];
                        case 7:
                            _a.sent();
                            publicEventEmissionState['upload-preview-update'] = 'sent';
                            _a.label = 8;
                        case 8:
                            if (canDispatchUploadEnd(fileState)) {
                                pendingEvents['upload-end'] = function () {
                                    dispatchUploadEnd(fileState);
                                    publicEventEmissionState['upload-end'] = 'sent';
                                };
                            }
                            dispatchPendingEvents();
                            if (canUnsubscribe()) {
                                this.unsubscribe();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
    });
};
var importFilesFromLocalUpload = function (selectedUploadFile, store, localUpload) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var touchFileDescriptor;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                touchFileDescriptor = selectedUploadFile.touchFileDescriptor;
                return [4 /*yield*/, exports.touchSelectedFile(touchFileDescriptor, store)];
            case 1:
                _a.sent();
                emitPublicEvents(selectedUploadFile, store, localUpload);
                return [2 /*return*/];
        }
    });
}); };
var importFilesFromRecentFiles = function (selectedUploadFile, store) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var file, touchFileDescriptor, fileId, source;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                file = selectedUploadFile.file, touchFileDescriptor = selectedUploadFile.touchFileDescriptor;
                fileId = touchFileDescriptor.fileId;
                source = {
                    id: file.id,
                    collection: constants_1.RECENTS_COLLECTION,
                };
                // we want to dispatch preview to provide card size to editor before we wait for http calls
                store.dispatch(getPreview_1.getPreview(fileId, file, constants_1.RECENTS_COLLECTION));
                return [4 /*yield*/, exports.touchSelectedFile(touchFileDescriptor, store)];
            case 1:
                _a.sent();
                store.dispatch(finalizeUpload_1.finalizeUpload(file, fileId, source));
                return [2 /*return*/];
        }
    });
}); };
var importFilesFromRemoteService = function (selectedUploadFile, store, wsConnectionHolder) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var touchFileDescriptor, serviceName, accountId, file, tenantFileId, uploadActivity;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                touchFileDescriptor = selectedUploadFile.touchFileDescriptor, serviceName = selectedUploadFile.serviceName, accountId = selectedUploadFile.accountId, file = selectedUploadFile.file;
                tenantFileId = touchFileDescriptor.fileId;
                uploadActivity = new remoteUploadActivity_1.RemoteUploadActivity(tenantFileId, serviceName, function (event, payload) {
                    if (event === 'NotifyMetadata') {
                        var preview = preview_1.getPreviewFromMetadata(payload.metadata);
                        store.dispatch(sendUploadEvent_1.sendUploadEvent({
                            event: {
                                name: 'upload-preview-update',
                                data: {
                                    file: file,
                                    preview: preview,
                                },
                            },
                            fileId: tenantFileId,
                        }));
                    }
                    else {
                        var tenantFileId_1 = payload.tenantFileId;
                        var newFile = tslib_1.__assign(tslib_1.__assign({}, file), { id: tenantFileId_1, creationDate: Date.now() });
                        store.dispatch(handleCloudFetchingEvent_1.handleCloudFetchingEvent(newFile, event, payload));
                    }
                });
                uploadActivity.on('Started', function () {
                    store.dispatch(remoteUploadStart_1.remoteUploadStart(tenantFileId));
                });
                wsConnectionHolder.openConnection(uploadActivity);
                wsConnectionHolder.send({
                    type: 'fetchFile',
                    params: {
                        serviceName: serviceName,
                        accountId: accountId,
                        // This fileId is identifier of a file in the cloud provider. For Dropbox for ex. it will be
                        // a filename path
                        fileId: file.id,
                        fileName: file.name,
                        collection: constants_1.RECENTS_COLLECTION,
                        // This seems to be a hack, where we hijack `jobId` to
                        // push through associated tenant fileId to use it in the future as a replaceFileId.
                        // Actual file will be created in parallel by next `touchSelectedFile()` call.
                        // IMPORTANT! This ID will magically becomes `uploadId` in most of the consequent messages coming back from WS
                        // (see RemoteUploadBasePayload.uploadId)
                        jobId: tenantFileId,
                    },
                });
                // that still may cause async issues if file is fetched before this has happened
                // but the chances of that are extremely slim as cloud fetching is a very lengthy procedure
                return [4 /*yield*/, exports.touchSelectedFile(touchFileDescriptor, store)];
            case 1:
                // that still may cause async issues if file is fetched before this has happened
                // but the chances of that are extremely slim as cloud fetching is a very lengthy procedure
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=importFiles.js.map