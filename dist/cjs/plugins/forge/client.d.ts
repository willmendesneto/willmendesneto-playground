import { ForgeInvokeParams, ForgeProvidersResponse } from './types';
import { JsonLd } from 'json-ld-types';
export declare class ForgeClient {
    getApiEndpoint(): string;
    invokeProvider(extensionKey: string, params: ForgeInvokeParams): Promise<JsonLd.Collection>;
    getProviders: () => Promise<ForgeProvidersResponse>;
    private fetch;
}
