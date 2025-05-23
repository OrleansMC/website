import type { NextApiRequest, NextApiResponse } from "next";
import ConsoleManager from "@/lib/server/logs/ConsoleManager";
import JWTManager from "@/lib/server/auth/JWTManager";
import SessionManager from "@/lib/server/auth/SessionManager";
import AuthManager from "@/lib/server/auth/AuthManager";
import WebhookManager from "@/lib/server/logs/WebhookManager";

type Data = {
    name: string;
};

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "100kb",
        },
        method: "POST",
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const sessionToken = JWTManager.getInstance().getSessionTokenFromJWT(req.cookies["orleans.token"] || "");

    if (!sessionToken) {
        return res.status(200).json({ name: "Already logged out" });
    }

    const ip = AuthManager.getInstance().getIpFromRequest(req) || "unknown";

    ConsoleManager.info("Logout", "User logged out from " + ip);

    const user = await AuthManager.getInstance().getUserFromSessionToken(sessionToken);
    if (user) {
        WebhookManager.sendLogoutWebhook(user, ip || "unknown");
    }

    res.setHeader('Set-Cookie',
        `orleans.token=; HttpOnly;${process.env.NODE_ENV === 'production' ? " Secure;" : ""
        } Max-Age=0; Path=/api`
    );

    await SessionManager.getInstance().deleteSession(sessionToken);

    res.status(200).json({ name: "Logged out" });
}