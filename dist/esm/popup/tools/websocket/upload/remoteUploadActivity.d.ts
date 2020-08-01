import { WsActivity, WsActivityEvents } from '../wsActivity';
import { WsUploadEvents } from './wsUploadEvents';
import { WsUploadMessageData } from '../wsMessageData';
import { ServiceName } from '../../../domain';
export declare type DispatchUploadEvent<T extends keyof WsUploadEvents> = (event: T, payload: WsUploadEvents[T]) => void;
export declare class RemoteUploadActivity implements WsActivity {
    private readonly tenantFileId;
    private readonly serviceName;
    private readonly dispatchEvent;
    private readonly eventEmitter;
    constructor(tenantFileId: string, serviceName: ServiceName, dispatchEvent: DispatchUploadEvent<keyof WsUploadEvents>);
    processWebSocketData(data: WsUploadMessageData): void;
    connectionLost(): void;
    on<T extends keyof WsActivityEvents>(event: T, handler: WsActivityEvents[T]): void;
    off<T extends keyof WsActivityEvents>(event: T, handler: WsActivityEvents[T]): void;
    private shouldProcessWsData;
    private notifyActivityStarted;
    private notifyActivityCompleted;
}
