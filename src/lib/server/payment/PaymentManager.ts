import { Collection } from "mongodb";
import PlayerManager from "../auth/PlayerManager";
import ActionManager from "../database/mongo/ActionManager";
import MongoManager from "../database/mongo/MongoManager";
import { BuyMeACoffeeData } from "@/pages/api/payment/buymeacoffee";

declare global {
    var paymentManager: PaymentManager;
}

export default class PaymentManager {
    private collection: Collection<BuyMeACoffeeData>;

    constructor () {
        this.collection = MongoManager.getInstance().websiteDatabase.collection<BuyMeACoffeeData>("payments");
    }

    public static getInstance(): PaymentManager {
        if (!global.paymentManager) {
            global.paymentManager = new PaymentManager();
        }

        return global.paymentManager;
    }

    public async addPayment(data: BuyMeACoffeeData) {
        return this.collection.insertOne(data);
    }

    public async addCredit(playerName: string, amount: number, reason: string) {
        const player = await PlayerManager.getInstance().getPlayer(playerName);
        const oldCredit = player.credit;
        await PlayerManager.getInstance().setCredit(player.name, oldCredit + amount);
        await ActionManager.getInstance().sendAction(
            {
                type: "COMMAND",
                reason: reason,
                server_type: null,
                command: `money ${player.name} CREDIT set ${oldCredit + amount}`,
                date: new Date(),
            },
        );
    }
}