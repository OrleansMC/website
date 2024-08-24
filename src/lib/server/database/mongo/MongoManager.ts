import axios from "axios"
import { Db, MongoClient } from "mongodb";

declare global {
    var MongoManager: MongoManager;
}

export default class MongoManager {
    public client: MongoClient;
    public websiteDatabase: Db;
    public minecraftDatabase: Db;

    private constructor() {
        this.client = new MongoClient(process.env.MONGO_URI as string);
        this.client.connect();
        this.websiteDatabase = this.client.db("website");
        this.minecraftDatabase = this.client.db("minecraft");
    }

    public static getInstance(): MongoManager {
        if (!global.MongoManager) {
            global.MongoManager = new MongoManager();
        }

        return global.MongoManager;
    }
}