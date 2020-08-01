"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var media_client_1 = require("@atlaskit/media-client");
var finalizeUpload_1 = require("../actions/finalizeUpload");
var source_file_1 = require("../domain/source-file");
var sendUploadEvent_1 = require("../actions/sendUploadEvent");
var actions_1 = require("../actions");
function default_1() {
    return function (store) { return function (next) { return function (action) {
        if (finalizeUpload_1.isFinalizeUploadAction(action)) {
            finalizeUpload(store, action);
        }
        return next(action);
    }; }; };
}
exports.default = default_1;
function finalizeUpload(store, _a) {
    var file = _a.file, replaceFileId = _a.replaceFileId, source = _a.source;
    var userMediaClient = store.getState().userMediaClient;
    return userMediaClient.config
        .authProvider()
        .then(source_file_1.mapAuthToSourceFileOwner)
        .then(function (owner) {
        var sourceFile = tslib_1.__assign(tslib_1.__assign({}, source), { owner: owner });
        var copyFileParams = {
            store: store,
            file: file,
            replaceFileId: replaceFileId,
            sourceFile: sourceFile,
        };
        return copyFile(copyFileParams);
    });
}
exports.finalizeUpload = finalizeUpload;
// Trigers a fetch to the recently copied file, and populates the existing state with the remote one
var emitProcessedState = function (destinationFile, store) {
    return new Promise(function (resolve) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var _a, tenantMediaClient, config, collection, tenantSubject, response, firstItem, currentState_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = store.getState(), tenantMediaClient = _a.tenantMediaClient, config = _a.config;
                    collection = config.uploadParams && config.uploadParams.collection;
                    tenantSubject = tenantMediaClient.file.getFileState(destinationFile.id);
                    return [4 /*yield*/, tenantMediaClient.mediaStore.getItems([destinationFile.id], collection)];
                case 1:
                    response = (_b.sent()).data;
                    firstItem = response.items[0];
                    if (!(firstItem && firstItem.details.processingStatus === 'succeeded')) return [3 /*break*/, 3];
                    return [4 /*yield*/, media_client_1.observableToPromise(tenantSubject)];
                case 2:
                    currentState_1 = _b.sent();
                    setTimeout(function () {
                        var _a = firstItem.details, artifacts = _a.artifacts, mediaType = _a.mediaType, mimeType = _a.mimeType, name = _a.name, size = _a.size, representations = _a.representations;
                        // we emit a new state which extends the existing one + the remote fields
                        // fields like "artifacts" will be later on required on MV and we don't have it locally beforehand
                        tenantSubject.next(tslib_1.__assign(tslib_1.__assign({}, currentState_1), { status: 'processed', artifacts: artifacts,
                            mediaType: mediaType,
                            mimeType: mimeType,
                            name: name,
                            size: size,
                            representations: representations }));
                        resolve();
                    }, 0);
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
function copyFile(_a) {
    var store = _a.store, file = _a.file, replaceFileId = _a.replaceFileId, sourceFile = _a.sourceFile;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _b, tenantMediaClient, config, collection, mediaStore, body, params, destinationFile, tenantSubject, fileState, error_1, errorState, cache, fileCache;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = store.getState(), tenantMediaClient = _b.tenantMediaClient, config = _b.config;
                    collection = config.uploadParams && config.uploadParams.collection;
                    mediaStore = new media_client_1.MediaStore({
                        authProvider: tenantMediaClient.config.authProvider,
                    });
                    body = {
                        sourceFile: sourceFile,
                    };
                    params = {
                        collection: collection,
                        replaceFileId: replaceFileId,
                        // > The file will be added to the specified collection with this occurrence key. For Target collection.
                        // The reason we reusing occurrenceKey from user's collection into tenant one is it remains the same value
                        // if the operation needs to be retried. And for that purpose, using the same occurrence key from the source collection works fine.
                        occurrenceKey: file.occurrenceKey,
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, mediaStore.copyFileWithToken(body, params)];
                case 2:
                    destinationFile = _c.sent();
                    emitProcessedState(destinationFile.data, store);
                    tenantSubject = tenantMediaClient.file.getFileState(destinationFile.data.id);
                    return [4 /*yield*/, media_client_1.observableToPromise(tenantSubject)];
                case 3:
                    fileState = _c.sent();
                    tenantMediaClient.emit('file-added', fileState);
                    media_client_1.globalMediaEventEmitter.emit('file-added', fileState);
                    if (fileState.status === 'processing' || fileState.status === 'processed') {
                        store.dispatch(sendUploadEvent_1.sendUploadEvent({
                            event: {
                                name: 'upload-end',
                                data: {
                                    file: file,
                                },
                            },
                            fileId: replaceFileId,
                        }));
                    }
                    else if (fileState.status === 'failed-processing' ||
                        fileState.status === 'error') {
                        store.dispatch(sendUploadEvent_1.sendUploadEvent({
                            event: {
                                name: 'upload-error',
                                data: {
                                    fileId: replaceFileId,
                                    error: {
                                        name: 'object_create_fail',
                                        description: 'There was an error while uploading a file',
                                    },
                                },
                            },
                            fileId: replaceFileId,
                        }));
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _c.sent();
                    errorState = {
                        id: replaceFileId,
                        status: 'error',
                        message: "error copying file to " + collection,
                    };
                    cache = media_client_1.getFileStreamsCache();
                    fileCache = cache.get(replaceFileId);
                    // We need this check since the return type of getFileStreamsCache().get might not be a ReplaySubject and won't have "next"
                    if (fileCache && fileCache.next) {
                        // This will cause media card to rerender with an error state on existent subscriptions
                        fileCache.next(errorState);
                    }
                    // Create a new subject with the error state for new subscriptions
                    cache.set(replaceFileId, media_client_1.createFileStateSubject(errorState));
                    store.dispatch(sendUploadEvent_1.sendUploadEvent({
                        event: {
                            name: 'upload-error',
                            data: {
                                fileId: replaceFileId,
                                error: {
                                    name: 'object_create_fail',
                                    description: error_1.message,
                                },
                            },
                        },
                        fileId: replaceFileId,
                    }));
                    return [3 /*break*/, 6];
                case 5:
                    store.dispatch(actions_1.resetView());
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=finalizeUpload.js.map