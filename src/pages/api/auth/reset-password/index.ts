import type { NextApiRequest, NextApiResponse } from "next";
import AuthManager from "@/lib/server/auth/AuthManager";
import Util from "@/lib/common/Util";
import fs from 'fs';
import EmailManager from "@/lib/server/email/EmailManager";
import axios from "axios";
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

const resetMailTemplate: string = fs.readFileSync('src/lib/server/email/ResetPasswordTemplate.html', { encoding: 'utf-8' });

export default async function ResetPasswordHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const email = req.body.email;
    const captcha = req.body.captcha as string;

    if (!email || !captcha) {
        return res.status(400).json({ name: "Missing fields" });
    }

    if (!Util.isValidEmail(email)) {
        return res.status(400).json({ name: "Invalid email" });
    }

    const captchaResponse = await axios.get(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${encodeURIComponent(captcha)}`
    ).then((res) => res.data).catch(() => { });

    if (!captchaResponse?.success) {
        ConsoleManager.warn("Login", "Invalid recaptcha token from " + req.socket.remoteAddress);
        return res.status(400).json({ name: 'invalid recaptcha token' });
    };

    const user = await AuthManager.getInstance().getWebUserByEmail(email);
    if (!user) {
        return res.status(400).json({ name: "User not found" });
    }

    const forgotPasswordToken = await AuthManager.getInstance().generateResetPasswordToken(user.username);
    await EmailManager.getInstance().sendEmail(
        user.email,
        "OrleansMC Şifre Sıfırlama",
        undefined,
        resetMailTemplate.replace("{URL}", `${process.env.WEBSITE_URL}/sifre-sifirla/${encodeURIComponent(forgotPasswordToken)
            }`)
    );
    res.status(200).json({ name: "Success" });
}