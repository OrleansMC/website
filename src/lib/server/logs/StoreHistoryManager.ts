
import { Collection } from "mongodb";
import MongoManager from "../database/mongo/MongoManager";
declare global {
    var storeHistoryManager: StoreHistoryManager;
}

type StoreHistoryItem = {
    date: Date;
    name: string;
    amount: number;
    price: number;
    item: string;
}

export type StoreHistory = {
    _id: string;
    history: StoreHistoryItem[];
    player_name: string;
}

export default class StoreHistoryManager {
    private collection: Collection<StoreHistory>;

    private constructor() {
        this.collection = MongoManager.getInstance().minecraftDatabase.collection<StoreHistory>("credit_market_history");
    }

    public static getInstance(): StoreHistoryManager {
        if (!global.storeHistoryManager) {
            global.storeHistoryManager = new StoreHistoryManager();
        }

        return global.storeHistoryManager;
    }

    public async addHistory(playerName: string, name: string, amount: number, price: number, item: string) {
        return this.collection.updateOne(
            { _id: playerName.toLowerCase() },
            {
                $push: { history: { date: new Date(), name, amount, price, item } },
                $setOnInsert: { player_name: playerName }
            },
            { upsert: true }
        );
    }

    public async getHistory(playerName: string) {
        return this.collection.findOne({ _id: playerName.toLowerCase() });
    }
}