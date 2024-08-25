import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import AuthManager from "@/lib/server/auth/AuthManager";
import Util from "@/lib/common/Util";
import ConsoleManager from "@/lib/server/logs/ConsoleManager";

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
    const username = req.body.username;
    const password = req.body.password;
    const captcha = req.body.captcha;

    if (!username || !password || !captcha) {
        ConsoleManager.warn("Login", "Missing fields from " + req.socket.remoteAddress);
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
        console.log(captchaResponse);
        ConsoleManager.warn("Login", "Invalid recaptcha token from " + req.socket.remoteAddress);
        return res.status(400).json({ name: 'invalid recaptcha token' });
    };

    try {
        const token = await AuthManager.getInstance().login(username, password, req.socket.remoteAddress || "unknown");
        res.setHeader("Set-Cookie", AuthManager.getInstance().generateCookie(token));
        return res.status(200).json({ name: "success" });
    } catch (error) {
        return res.status(400).json({ name: (error as Error).message });
    }
}