import BlogManager from "@/lib/server/blog/BlogManager";
import { User } from "@/lib/server/auth/AuthManager";

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
        CLIENT_SECRET: string;
        CLIENT_ID: string;
        BOT_TOKEN: string;
        BUYMEACOFFEE_SECRET: string;
        BUYMEACOFFEE_API_TOKEN: string;
    }
}

export type PageProps = {
    user: User;
} & React.HTMLProps<HTMLDivElement>;