import AuthManager from "@/lib/server/auth/AuthManager";
import JWTManager from "@/lib/server/auth/JWTManager";
import DiscordOauth2Manager from "@/lib/server/discord/DiscordOauth2Manager";
import { getMetadata, pushMetadata } from "@/lib/server/discord/MetadataUtil";
import ConsoleManager from "@/lib/server/logs/ConsoleManager";
import { NextApiRequest, NextApiResponse } from "next/types";

export const config = {
    api: {
        method: "GET",
    },
};

export default async function DiscordCallback(req: NextApiRequest, res: NextApiResponse) {
    const code = req.query.code as string;
    if (!code) {
        return res.status(400).json({ error: "No code provided" });
    };

    try {
        const sessionToken = JWTManager.getInstance().getSessionTokenFromJWT(req.cookies["orleans.token"] || "");

        if (!sessionToken) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await AuthManager.getInstance().getUserFromSessionToken(sessionToken);

        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const oldAccount = await DiscordOauth2Manager.getInstance().getAccount(user.username.toLocaleLowerCase());

        if (oldAccount) {
            pushMetadata(oldAccount.access_token, undefined);
        }

        const discordOauth2Manager = DiscordOauth2Manager.getInstance();
        const discordOauth2 = discordOauth2Manager.getOAuth();
        const account = await discordOauth2.tokenRequest(
            {
                code,
                scope: discordOauth2Manager.scopes,
                grantType: "authorization_code",
                redirectUri: discordOauth2Manager.redirectUri
            }
        );

        const discordUser = await discordOauth2.getUser(account.access_token);
        await discordOauth2Manager.updateAccount({
            _id: user.username.toLocaleLowerCase(),
            ...account,
            updated_at: Date.now()
        });

        await discordOauth2Manager.updateUser({
            _id: user.username.toLocaleLowerCase(),
            ...discordUser,
            updated_at: Date.now()
        });

        await discordOauth2.addMember(
            {
                userId: discordUser.id,
                guildId: "1168183765441458306",
                botToken: process.env.BOT_TOKEN!,
                accessToken: account.access_token
            }
        );

        const oldMetaDatas = await getMetadata(account.access_token);
        const newMetaData = {
            oyuncu: 1,
            lord: 0,
            titan: 0,
            yuce: 0,
            legend: 0
        };
        let playerRank = user.player.rank;
        if (playerRank === "player") {
            playerRank = "oyuncu";
        }
        if (newMetaData[playerRank]) {
            newMetaData[playerRank] = 1;
        }

        if (oldMetaDatas.metadata !== newMetaData) {
            ConsoleManager.info("DiscordCallback", "Pushing metadata");
            pushMetadata(account.access_token, newMetaData);
        };

        res.redirect("/");
    } catch (error) {
        console.error(error);
        if (res.writable) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: "An unknown error occurred" });
            }
        }
    }
};