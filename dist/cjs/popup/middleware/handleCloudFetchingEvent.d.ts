import { Action, Dispatch, Store } from 'redux';
import { HandleCloudFetchingEventAction } from '../actions/handleCloudFetchingEvent';
import { State } from '../domain';
import { WsUploadEvents } from '../tools/websocket/upload/wsUploadEvents';
export declare type CloudFetchingEventAction = HandleCloudFetchingEventAction<keyof WsUploadEvents>;
export declare const handleCloudFetchingEvent: (store: Store<State>) => (next: Dispatch<State>) => (action: Action) => Action;
