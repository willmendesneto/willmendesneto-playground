import { JsonLd } from 'json-ld-types';
export declare const getMetadata: (id: string, resource: Pick<JsonLd.Primitives.Image | JsonLd.Data.Document, "url" | "image" | "preview" | "summary" | "location" | "content" | "name" | "to" | "icon" | "duration" | "@type" | "@id" | "attachment" | "attributedTo" | "audience" | "bcc" | "bto" | "cc" | "context" | "generator" | "inReplyTo" | "oneOf" | "anyOf" | "closed" | "replies" | "tag" | "contentMap" | "nameMap" | "mediaType" | "endTime" | "published" | "startTime" | "summaryMap" | "updated">) => {
    id: string;
    metadata: {
        type: string;
        src: string | undefined;
        srcFull: string | undefined;
    };
} | {
    id: string;
    metadata: {
        type: string;
        src: string | undefined;
        srcFull?: undefined;
    };
};
