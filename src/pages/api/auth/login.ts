import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import AuthManager from "@/lib/server/auth/AuthManager";
import Util from "@/lib/common/Util";
import ConsoleManager from "@/lib/server/logs/ConsoleManager";
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
    const username = req.body.username as string;
    const password = req.body.password as string;
    const captcha = req.body.captcha as string;

    const ip = req.headers['CF-Connecting-IP'] as string || req.headers['x-real-ip'] as string || req.socket.remoteAddress;
    if (!username || !password || !captcha) {
        ConsoleManager.warn("Login", "Missing fields from " + ip);
        return res.status(400).json({ name: "Missing fields" });
    }

    try {
        Util.validateMinecraftNickname(username);
    } catch (error) {
        return res.status(400).json({ name: (error as Error).message });
    }

    const captchaResponse = await axios.get(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${encodeURIComponent(captcha)}`
    ).then((res) => res.data).catch(() => { });
    if (!captchaResponse?.success) {
        ConsoleManager.warn("Login", "Invalid recaptcha token from " + ip);
        return res.status(400).json({ name: 'invalid recaptcha token' });
    };

    try {
        const token = await AuthManager.getInstance().login(username, password, ip || "unknown");
        res.setHeader("Set-Cookie", AuthManager.getInstance().generateCookie(token));
        const user = await AuthManager.getInstance().getUser(username);
        if (user) WebhookManager.sendLoginWebhook(user, ip || "unknown");
        res.status(200).json({ name: "success" });
    } catch (error) {
        return res.status(400).json({ name: (error as Error).message });
    }
}