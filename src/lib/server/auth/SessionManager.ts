import { Collection } from "mongodb";
import MongoManager from "../database/mongo/MongoManager";
import crypto from "crypto";

declare global {
    var sessionManager: SessionManager;
}

export type Session = {
    username: string;
    token: string;
    ips: string[];
    createdAt: Date;
}

export default class SessionManager {
    private collection: Collection<Session>;

    private constructor() {
        this.collection = MongoManager.getInstance().websiteDatabase.collection<Session>('sessions');

        setInterval(async () => {
            const sessions = await this.collection.find({
                createdAt: {
                    $lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
                }
            }).toArray();

            for (const session of sessions) {
                await this.collection.deleteOne({ token: session.token });
            }
        });
    }

    public static getInstance(): SessionManager {
        if (!global.sessionManager) {
            global.sessionManager = new SessionManager();
        }

        return global.sessionManager;
    }

    public async createSession(username: string, ip: string): Promise<Session> {
        const session = {
            username,
            token: crypto.randomBytes(32).toString('hex'),
            ips: [ip],
            createdAt: new Date()
        };
        await this.collection.insertOne(session);
        return session;
    }

    public async updateSession(session: Session): Promise<void> {
        await this.collection.updateOne({ token: session.token }, { $set: session });
    }

    public async getSession(token: string): Promise<Session | null> {
        return this.collection.findOne({ token });
    }

    public async getSessionsByIp(ip: string, excludedUsername?: string): Promise<Session[]> {
        return this.collection.find({
            ips: ip,
            username: {
                $ne: excludedUsername
            }
        }).toArray();
    }

    public async deleteSession(token: string): Promise<void> {
        await this.collection.deleteOne({ token });
    }
}