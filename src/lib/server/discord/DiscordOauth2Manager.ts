import DiscordOauth2, { TokenRequestResult, User } from "discord-oauth2";
import ConsoleManager from "../logs/ConsoleManager";
import { Collection } from "mongodb";
import MongoManager from "../database/mongo/MongoManager";
import { registerMetadata } from "./MetadataUtil";

declare global {
    var discordOauth2Manager: DiscordOauth2Manager;
}

export type DiscordAccount = TokenRequestResult & {
    _id: string;
    updated_at: number;
}

export type DiscordUser = User & {
    _id: string;
    updated_at: number;
}

export default class DiscordOauth2Manager {
    private oauth: DiscordOauth2;
    private users: Collection<DiscordUser>;
    private accounts: Collection<DiscordAccount>;
    private updateInterval: number = 1000 * 60 * 60 * 24;
    public scopes: string[] = ["identify", "guilds.join", "email", "role_connections.write"];
    public redirectUri: string = process.env.WEBSITE_URL + "/api/discord/callback";

    private constructor() {
        this.oauth = new DiscordOauth2({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        });
        const mongoManager = MongoManager.getInstance();
        this.users = mongoManager.websiteDatabase.collection<DiscordUser>("discord_users");
        this.accounts = mongoManager.websiteDatabase.collection<DiscordAccount>("discord_accounts");
        registerMetadata().then(() => ConsoleManager.info("DiscordOauth2Manager", "Metadata registered"));
        ConsoleManager.info("DiscordOauth2Manager", "Initialized");
    }

    public static getInstance(): DiscordOauth2Manager {
        if (!global.discordOauth2Manager) {
            global.discordOauth2Manager = new DiscordOauth2Manager();
        }
        return global.discordOauth2Manager;
    }

    public generateAuthUrl(): string {
        return this.oauth.generateAuthUrl({
            scope: this.scopes,
            redirectUri: this.redirectUri,
            responseType: "code"
        });
    }

    public getOAuth(): DiscordOauth2 {
        return this.oauth;
    };

    public async getUser(playerName: string) {
        try {
            const _id = playerName.toLowerCase();

            const user = await this.users.findOne<DiscordUser>({ _id });

            if (!user) {
                return null;
            }

            if (user.updated_at + this.updateInterval <= Date.now()) {
                ConsoleManager.log("DiscordOauth2Manager", "User is outdated, updating user: " + user._id);
                return this.refreshUser(user);
            };

            return user;
        } catch (e) {
            return null;
        }
    }

    public async refreshUser(user: DiscordUser): Promise<DiscordUser | null> {
        const oauth = DiscordOauth2Manager.getInstance().getOAuth();

        const account = await this.getAccount(user._id);
        if (!account) {
            return null;
        };

        const newUser = {
            _id: user._id,
            ...await oauth.getUser(account.access_token),
            updated_at: Date.now()
        };

        await this.updateUser(newUser);

        ConsoleManager.log("DiscordOauth2Manager", "User updated: " + newUser._id);
        return newUser;
    }

    public async updateUser(user: DiscordUser) {
        return this.users.updateOne({ _id: user._id }, { $set: user }, { upsert: true });
    }

    public async getAccount(playerName: string) {
        const _id = playerName.toLocaleLowerCase();
        const account = await this.accounts.findOne<DiscordAccount>({ _id: _id });

        if (!account) {
            return null;
        }

        if (account.updated_at + account.expires_in * 1000 <= Date.now()) {
            const oauth = DiscordOauth2Manager.getInstance().getOAuth();
            const newAccount = await oauth.tokenRequest({
                grantType: "refresh_token",
                scope: this.scopes,
                refreshToken: account.refresh_token
            });

            await this.updateAccount({
                ...newAccount,
                _id: _id,
                updated_at: Date.now()
            });

            ConsoleManager.log("DiscordOauth2Manager", "Account updated: " + account._id);

            return newAccount;
        }

        return account;
    }

    public async updateAccount(account: DiscordAccount) {
        return this.accounts.updateOne({ _id: account._id }, { $set: account }, { upsert: true });
    }
}