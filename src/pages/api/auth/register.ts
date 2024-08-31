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

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>,) {
  const email = req.body.email;
  const pin = req.body.pin;
  const password = req.body.password;
  const username = req.body.username;
  const captcha = req.body.captcha;

  const ip = req.headers['x-real-ip'] as string || req.socket.remoteAddress;
  if (!email || !password || !username) {
    ConsoleManager.warn("Register", "Missing fields from " + ip);
    return res.status(400).json({ name: "Missing fields" });
  }

  try {
    Util.validateMinecraftNickname(username);
  } catch (error) {
    return res.status(400).json({ name: (error as Error).message });
  }

  try {
    Util.validatePassword(password);
  } catch (error) {
    return res.status(400).json({ name: (error as Error).message });
  }

  if (!Util.isValidEmail(email)) {
    return res.status(400).json({ name: "Invalid email" });
  }

  if (password.length < 6) {
    return res.status(400).json({ name: "Şifre en az 6 karakter olmalıdır" });
  } else if (password.length > 32) {
    return res.status(400).json({ name: "Şifre en fazla 32 karakter olmalıdır" });
  }

  if (!pin) {
    if (!captcha) {
      return res.status(400).json({ name: "Missing captcha" });
    }

    const captchaResponse = await axios.get(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${encodeURIComponent(captcha)}`
    ).then((res) => res.data).catch(() => { });

    if (!captchaResponse?.success) {
      ConsoleManager.warn("Register", "Invalid recaptcha token from " + ip);
      return res.status(400).json({ name: 'invalid recaptcha token' });
    };
  }

  try {
    const registered = await AuthManager.getInstance().register(email, username, password, pin, ip || "unknown");
    if (registered) {
      const token = await AuthManager.getInstance().login(username, password, ip || "unknown");
      res.setHeader("Set-Cookie", AuthManager.getInstance().generateCookie(token));
    }
    return res.status(200).json({ name: "success" });
  } catch (error) {
    return res.status(400).json({ name: (error as Error).message });
  }
}