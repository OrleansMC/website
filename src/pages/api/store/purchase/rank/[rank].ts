import AuthManager from "@/lib/server/auth/AuthManager";
import JWTManager from "@/lib/server/auth/JWTManager";
import PlayerManager from "@/lib/server/auth/PlayerManager";
import ActionManager from "@/lib/server/database/mongo/ActionManager";
import ConsoleManager from "@/lib/server/logs/ConsoleManager";
import StoreHistoryManager from "@/lib/server/logs/StoreHistoryManager";
import WebhookManager from "@/lib/server/logs/WebhookManager";
import RankManager from "@/lib/server/store/RanksManager";
import type { NextApiRequest, NextApiResponse } from "next";

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

export default async function PurchaseHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const sessionToken = JWTManager.getInstance().getSessionTokenFromJWT(req.cookies["orleans.token"] || "");

    if (!sessionToken) {
        return res.status(401).json({ name: "Unauthorized" });
    }

    const user = await AuthManager.getInstance().getUserFromSessionToken(sessionToken);

    if (!user) {
        return res.status(401).json({ name: "Unauthorized" });
    }

    const rankCreditMarketId = req.query.rank as string;
    if (!rankCreditMarketId) {
        return res.status(400).json({ name: "Missing fields" });
    }

    const rank = RankManager.getInstance().getRankByCreditMarketId(rankCreditMarketId);
    if (!rank) {
        return res.status(400).json({ name: "Invalid rank" });
    }

    if (!rank.attributes.price) {
        return res.status(400).json({ name: "Invalid rank" });
    }

    if (user.player.credit < rank.attributes.price) {
        return res.status(400).json({ name: "Krediniz bu ürünü satın almak için yetersiz" });
    }

    const oldCredit = user.player.credit;
    await PlayerManager.getInstance().setCredit(user.player.name, oldCredit - rank.attributes.price);

    await ActionManager.getInstance().sendAction(
        {
            type: "COMMAND",
            reason: `Player ${user.player.name} purchased rank ${rank.attributes.title}`,
            server_type: null,
            command: `money ${user.player.name} CREDIT set ${oldCredit - rank.attributes.price!}`,
            date: new Date(),
        },
    );

    for (const command of rank.attributes.commands || []) {
        await ActionManager.getInstance().sendAction(
            {
                type: "COMMAND",
                reason: `Player ${user.player.name} purchased rank ${rank.attributes.title}`,
                server_type: null,
                command: command.replace("%player_name%", user.player.name),
                date: new Date(),
            },
        );
    }

    ConsoleManager.info("Purchase", `Player ${user.player.name} purchased rank ${rank.attributes.title}`);

    res.status(200).json({ name: "success" });

    const ip = AuthManager.getInstance().getIpFromRequest(req) || "unknown";
    WebhookManager.sendCreditMarketPurchaseWebhook(
        user,
        ip || "unknown",
        rank.attributes.title,
        rank.attributes.price
    );
    await StoreHistoryManager.getInstance().addHistory(user.player.name, rank.attributes.title, 1, rank.attributes.price, rank.attributes.title);
}
