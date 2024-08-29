
import { Collection } from "mongodb";
declare global {
    var storeHistoryManager: StoreHistoryManager;
}

export type StoreHistory = {
    _id: string;
    date: Date;
    name: string;
    amount: number;
    price: number;
    item: string;
}

export default class StoreHistoryManager {
    private collection: Collection<StoreHistory>;

    private constructor() {
        this.collection = global.MongoManager.minecraftDatabase.collection<StoreHistory>("credit_market_history");
    }

    public static getInstance(): StoreHistoryManager {
        if (!global.storeHistoryManager) {
            global.storeHistoryManager = new StoreHistoryManager();
        }

        return global.storeHistoryManager;
    }

    public async addHistory(playerName: string, amount: number, price: number, item: string) {
        return this.collection.updateOne(
            { _id: playerName.toLowerCase() },
            {
                $push: { history: { date: new Date(), amount, price, item } },
                $setOnInsert: { player_name: playerName }
            },
            { upsert: true }
        );
    }
}