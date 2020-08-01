import { State } from './domain';
export declare type DefaultStateKeys = Exclude<keyof State, 'tenantMediaClient' | 'userMediaClient' | 'redirectUrl' | 'config'>;
export declare type DefaultState = Pick<State, DefaultStateKeys>;
declare const defaultState: DefaultState;
export default defaultState;
