import type { NextApiRequest, NextApiResponse } from "next";
import ConsoleManager from "@/lib/server/logs/ConsoleManager";
import JWTManager from "@/lib/server/auth/JWTManager";
import SessionManager from "@/lib/server/auth/SessionManager";

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

    await SessionManager.getInstance().deleteSession(sessionToken);

    res.setHeader('Set-Cookie',
        `orleans.token=; HttpOnly;${process.env.NODE_ENV === 'production' ? " Secure;" : ""
        } Max-Age=0; Path=/api`
    );

    ConsoleManager.info("Logout", "User logged out from " + req.socket.remoteAddress);
    res.status(200).json({ name: "Logged out" });
}