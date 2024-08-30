import { Db, MongoClient } from "mongodb";
import ConsoleManager from "../../logs/ConsoleManager";
import RedisManager from "../redis/RedisManager";

declare global {
    var mongoManager: MongoManager;
}

export default class MongoManager {
    public client: MongoClient;
    public websiteDatabase: Db;
    public minecraftDatabase: Db;

    private constructor() {
        this.client = new MongoClient(process.env.MONGO_URI as string);
        this.client.connect().then(() => {
            ConsoleManager.debug('Mongo Manager', 'Connected to MongoDB');
        });
        this.websiteDatabase = this.client.db("website");
        this.minecraftDatabase = this.client.db("minecraft");
        RedisManager.getInstance();
    }

    public static getInstance(): MongoManager {
        if (!global.mongoManager) {
            global.mongoManager = new MongoManager();
        }

        return global.mongoManager;
    }
}