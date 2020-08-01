import { Action, Dispatch, Store } from 'redux';
import { State } from '../domain';
import { MediaPickerPlugin } from '../../domain/plugin';
import { ForgeProvider } from '../../plugins/forge';
export declare const getForgePlugins: () => (store: Store<State>) => (next: Dispatch<Action>) => (action: Action) => Action;
export declare const requestForgePlugins: (store: Store<State>) => Promise<void>;
export declare const transformForgeProviderToPlugin: (provider: ForgeProvider) => MediaPickerPlugin;
