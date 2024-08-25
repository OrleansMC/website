
import { Collection } from 'mongodb';
import MongoManager from '../database/mongo/MongoManager';

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
    uuid: string;
    mojang_uuid: string;
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

    public async getPlayer(uuid: string): Promise<Player | null> {
        const player = await this.collection.findOne({ uuid });
        if (!player) return null;

        return {
            name: player.name,
            uuid: player.uuid,
            mojang_uuid: player.uuid
        };
    }
}