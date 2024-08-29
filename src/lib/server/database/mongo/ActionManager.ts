import { Collection } from "mongodb";

declare global {
    var actionManager: ActionManager;
}

export type Action = {
    type: "COMMAND" | "UNKNOWN";
    reason: string;
    command: string;
    server_type: "REALMS" | "REALMS_SPAWN" | "REALMS_OUTLAND" | null;
    date: Date;
}

export default class ActionManager {
    private collection: Collection<Action>;

    private constructor() {
        this.collection = global.MongoManager.minecraftDatabase.collection<Action>("pending_actions");
    }

    public static getInstance(): ActionManager {
        if (!global.actionManager) {
            global.actionManager = new ActionManager();
        }

        return global.actionManager;
    }

    public async sendAction(action: Action) {
        await this.collection.insertOne(action);
    }
}