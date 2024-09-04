import AuthManager from "@/lib/server/auth/AuthManager";
import ConsoleManager from "@/lib/server/logs/ConsoleManager";
import WebhookManager from "@/lib/server/logs/WebhookManager";
import PaymentManager from "@/lib/server/payment/PaymentManager";
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

export type BuyMeACoffeeExtra = {
    id: number,
    title: string,
    amount: string,
    quantity: number,
    object: "extra",
    currency: "USD",
    description: string,
    extra_question: string,
    question_answers: string[],
}

export type BuyMeACoffeeData = {
    id: number,
    amount: number,
    extras: BuyMeACoffeeExtra[],
    object: "payment",
    status: "succeeded",
    message: string,
    currency: "USD",
    refunded: "false",
    created_at: number,
    note_hidden: "false",
    refunded_at: null,
    support_note: null,
    support_type: "Extra",
    supporter_name: string,
    transaction_id: string,
    application_fee: string,
    supporter_id: number,
    supporter_email: string,
    total_amount_charged: string,
}

export type BuyMeACoffeePlayload = {
    type: "extra_purchase.created",
    live_mode: boolean,
    attempt: number,
    created: number,
    event_id: string,
    data: BuyMeACoffeeData,
}

export default async function BuyMeACoffeeHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const body = req.body as BuyMeACoffeePlayload;
        if (body.type !== "extra_purchase.created") {
            ConsoleManager.error("BuyMeACoffeeHandler", "Invalid request type: " + body.type);
            return res.status(400).json({ name: "Invalid request" });
        }

        const token = req.query.token as string;
        const secret = process.env.BUYMEACOFFEE_SECRET;

        if (token !== secret) {
            ConsoleManager.error("BuyMeACoffeeHandler", "Unauthorized request: " + token);
            return res.status(401).json({ name: "Unauthorized" });
        }

        const user = await AuthManager.getInstance().getWebUserByEmail(body.data.supporter_email);

        if (!user) {
            WebhookManager.sendCreditPurchaseFailedWebhook(body.data);
            return res.status(200).json({ name: "Player not found" });
        }

        for (const extra of body.data.extras) {
            const creditAmount = parseInt(extra.title.split(" ")[0].replace(/[^0-9]/g, "")) || 0;
            await PaymentManager.getInstance().addCredit(user.username, creditAmount,
                `BuyMeACoffee'den ${user.username} (${body.data.supporter_name}) tarafından ${creditAmount} kredi satın alındı`);
        }
        await PaymentManager.getInstance().addPayment(body.data);
        WebhookManager.sendCreditPurchaseWebhook(body.data, user);
        return res.status(200).json({ name: "Success" });
    } catch (error) {
        console.error(error);
        ConsoleManager.error("BuyMeACoffeeHandler", (error as any).message);
        return res.status(400).json({ name: "Invalid request" });
    }
}
