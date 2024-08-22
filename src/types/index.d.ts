import BlogManager from "@/lib/server/BlogManager";

declare namespace JSX {
    interface IntrinsicElements {
        "lottie-player": any;
    }
};

declare namespace NodeJS {
    interface ProcessEnv {
        [key: string]: unknown;
        STRAPI_URL: string;
        STRAPI_TOKEN: string;
    }
}