import { JsonLd } from 'json-ld-types';
export declare const getImageUrl: (data: JsonLd.Primitives.Object<any>) => string | undefined;
export declare const getResourceUrl: (url: string | JsonLd.Primitives.LinkModel | JsonLd.Primitives.Link[] | undefined) => string | undefined;
export declare const getDateString: (timestamp?: string | undefined) => string;
