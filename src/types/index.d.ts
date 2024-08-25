import BlogManager from "@/lib/server/blog/BlogManager";
import { WebUser } from "@/lib/server/auth/AuthManager";

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
        MONGO_URI: string;
        REDIS_URI: string;
        MYSQL_AUTH_URI: string;
        MAILGUN_PASSWORD: string;
        RECAPTCHA_SECRET_KEY: string;
    }
}

export type PageProps = {
    user: WebUser;
} & React.HTMLProps<HTMLDivElement>;