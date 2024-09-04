import type { NextApiRequest, NextApiResponse } from "next";
import JWTManager from "@/lib/server/auth/JWTManager";
import SessionManager from "@/lib/server/auth/SessionManager";
import AuthManager from "@/lib/server/auth/AuthManager";
import Util from "@/lib/common/Util";

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

export default async function ChangePasswordHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const sessionToken = JWTManager.getInstance().getSessionTokenFromJWT(req.cookies["orleans.token"] || "");

    if (!sessionToken) {
        return res.status(401).json({ name: "Unauthorized" });
    }

    const user = await AuthManager.getInstance().getUserFromSessionToken(sessionToken);
    if (!user) {
        return res.status(401).json({ name: "Unauthorized" });
    }

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ name: "Missing fields" });
    }

    try {
        Util.validatePassword(newPassword);
    } catch (error) {
        return res.status(400).json({ name: (error as Error).message });
    }

    if (oldPassword === newPassword) {
        return res.status(400).json({ name: "Yeni şifre eski şifre ile aynı olamaz" });
    }

    try {
        await AuthManager.getInstance().changePassword(user.username, oldPassword, newPassword);
    } catch (error) {
        return res.status(400).json({ name: (error as Error).message });
    }

    await SessionManager.getInstance().deleteSessionsByUsername(user.username, sessionToken);
    res.status(200).json({ name: "Success" });
}