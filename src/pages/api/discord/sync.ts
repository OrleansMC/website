import DiscordOauth2Manager from "@/lib/server/discord/DiscordOauth2Manager";
import { NextApiRequest, NextApiResponse } from "next/types";

export const config = {
    api: {
        method: "GET",
    },
};

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    const url = DiscordOauth2Manager.getInstance().generateAuthUrl();
    res.redirect(url);
};