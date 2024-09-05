import AuthManager from "@/lib/server/auth/AuthManager";
import ConsoleManager from "@/lib/server/logs/ConsoleManager";

import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: {
        method: "GET",
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.headers.authorization;
    if (token !== process.env.DASHBOARD_API_TOKEN) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const ip = AuthManager.getInstance().getIpFromRequest(req) || "unknown";
    if (!ip.startsWith("172.") && ip !== "::1") {
        return res.status(403).json({ error: "Forbidden" });
    }

    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const user = await AuthManager.getInstance().getUser(userId as string);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    ConsoleManager.log("Dashboard", `User ${user.username} accessed by ${ip}`);
    const forgotPasswordToken = await AuthManager.getInstance().generateResetPasswordToken(user.username);
    return res.status(200).json({ reset_link: `${process.env.WEBSITE_URL}/sifre-sifirla/${forgotPasswordToken}` });
}