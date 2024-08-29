
import { Collection } from 'mongodb';
import MongoManager from '../database/mongo/MongoManager';
import RedisManager from '../database/redis/RedisManager';
import ConsoleManager from '../logs/ConsoleManager';

declare global {
    var playerManager: PlayerManager;
}

type MongoPlayer = {
    _id: string;
    name: string;
    uuid: string;
}

export type Player = {
    name: string;
    credit: number;
    gem: number;
}

export default class PlayerManager {
    private collection: Collection<MongoPlayer>;

    private constructor() {
        this.collection = MongoManager.getInstance().minecraftDatabase.collection<MongoPlayer>('players');
    }

    public static getInstance(): PlayerManager {
        if (!global.playerManager) {
            global.playerManager = new PlayerManager();
        }

        return global.playerManager;
    }

    public async setCredit(name: string, amount: number): Promise<void> {
        const redis = RedisManager.getInstance();
        const uuid = await redis.getClient().hGet("rediseco:nameuuid", name);

        if (uuid) {
            await redis.getClient().zAdd("rediseco:balances_CREDIT", { value: uuid, score: amount });
        }
    }

    public async getPlayer(name: string): Promise<Player> {
        const redis = RedisManager.getInstance();
        const uuid = await redis.getClient().hGet("rediseco:nameuuid", name);
        let gem = 0;
        let credit = 0;
        if (uuid) {
            const amounts = await Promise.all([
                redis.getClient().zScore("rediseco:balances_CREDIT", uuid),
                redis.getClient().zScore("rediseco:balances_GEM", uuid)
            ])

            credit = amounts[0] || 0;
            gem = amounts[1] || 0;
        }

        return {
            name: name,
            credit: credit,
            gem: gem
        };
    }
}