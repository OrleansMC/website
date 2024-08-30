import AuthManager from "@/lib/server/auth/AuthManager";
import JWTManager from "@/lib/server/auth/JWTManager";
import DiscordOauth2Manager from "@/lib/server/discord/DiscordOauth2Manager";
import { NextApiRequest, NextApiResponse } from "next/types";

export const config = {
    api: {
        method: "GET",
    },
};

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    const sessionToken = JWTManager.getInstance().getSessionTokenFromJWT(req.cookies["orleans.token"] || "");

    if (!sessionToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await AuthManager.getInstance().getUserFromSessionToken(sessionToken);

    if (!user) {
        return res.redirect("/giris-yap");
    }

    const url = DiscordOauth2Manager.getInstance().generateAuthUrl();
    res.redirect(url);
};