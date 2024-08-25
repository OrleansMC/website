import { createClient, RedisClientType } from 'redis';
import ConsoleManager from '../../logs/ConsoleManager';

declare global {
    var redisManager: RedisManager;
}

export default class RedisManager {
    private client: RedisClientType;

    private constructor() {
        this.client = createClient({
            url: process.env.REDIS_URI
        });
        this.client.connect().then(async () => {
            ConsoleManager.debug('Redis Manager', 'Connected to Redis');
        });
    }

    public getClient(): RedisClientType {
        return this.client;
    }

    public static getInstance(): RedisManager {
        if (!global.redisManager) {
            global.redisManager = new RedisManager();
        }

        return global.redisManager;
    }
}