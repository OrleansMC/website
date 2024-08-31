import type { NextApiRequest, NextApiResponse } from "next";
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
export default async function ResetPasswordTokenHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const token = req.query.token as string;
    const newPassword = req.body.newPassword;
    if (!token || !newPassword) {
        return res.status(400).json({ name: "Missing fields" });
    }

    try {
        Util.validatePassword(newPassword);
        await AuthManager.getInstance().resetPassword(token, newPassword);
    } catch (error) {
        return res.status(400).json({ name: (error as Error).message });
    }

    res.status(200).json({ name: "Success" });
}