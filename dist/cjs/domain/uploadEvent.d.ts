import { UploadEventPayloadMap } from '../types';
export declare type UploadEventMap = {
    readonly [K in keyof UploadEventPayloadMap]: {
        readonly name: K;
        readonly data: UploadEventPayloadMap[K];
    };
};
export declare type UploadEventName = keyof UploadEventMap;
export declare type UploadEvent = UploadEventMap[UploadEventName];
export declare type UploadErrorEvent = UploadEventMap['upload-error'];
