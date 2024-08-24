import { Collection } from "mongodb";
import MongoManager from "../database/mongo/MongoManager";
import MysqlManager from "../database/mysql/MysqlManager";
import JWTManager from "./JWTManager";
import EmailManager from "../email/EmailManager";
import SessionManager from "./SessionManager";
import bcrypt from 'bcrypt';
import Util from "@/lib/common/Util";
import axios from "axios";
import fs from 'fs';
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import ConsoleManager from "../logs/ConsoleManager";

declare global {
    var authManager: AuthManager;
}

export type WebUser = {
    _id: string;
    email: string;
    username: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}


export type PendingRegistration = {
    pin: string;
    email: string;
    password: string;
    username: string;
}


const pinMailTemplate: string = fs.readFileSync('src/lib/server/email/PINTemplate.html', { encoding: 'utf-8' });

export default class AuthManager {
    public userCollection: Collection<WebUser>;
    public pendingRegistrations: Map<string, PendingRegistration>;

    private constructor() {
        ConsoleManager.info("AuthManager", "AuthManager initialized.");
        this.userCollection = MongoManager.getInstance().websiteDatabase.collection<WebUser>("users");
        this.pendingRegistrations = new Map();
    }

    public static getInstance(): AuthManager {
        if (!global.authManager) {
            global.authManager = new AuthManager();
        }

        return global.authManager;
    }

    public async register(email: string, username: string, password: string, pin?: string, ip?: string): Promise<void> {
        if (!Util.isValidEmail(email)) {
            throw new Error("Geçersiz email adresi.");
        }

        Util.validateMinecraftNickname(username);

        const user = await this.getWebUser(username);
        if (user) {
            throw new Error("Bu kullanıcı adı zaten alınmış.");
        }

        const emailUser = await this.getWebUserByEmail(email);
        if (emailUser) {
            throw new Error("Bu e-posta adresi zaten kullanılmakta.");
        }

        if (ip) {
            const theSessionHasSameIP = await SessionManager.getInstance().getSessionsByIp(ip, username);
            if (theSessionHasSameIP.length > 0) {
                throw new Error("Bu IP adresiyle zaten bir hesap oluşturulmuş.");
            }
        }

        const pendingRegistration = this.pendingRegistrations.get(username);
        if (pendingRegistration && !pin) {
            ConsoleManager.warn("AuthManager", "Kullanıcı zaten kayıt olmaya çalışıyordu ama pin yoktu. Pin yeniden gönderildi: " + username);
            this.pendingRegistrations.delete(username);
        }

        if (pendingRegistration && pin) {
            if (!pendingRegistration) {
                ConsoleManager.warn("AuthManager", "Kullanıcının pin bilgisi yoktu: " + username);
                throw new Error("Pininizin süresi doldu. Lütfen tekrar deneyin.");
            }

            if (!pendingRegistration || pendingRegistration.pin !== pin) {
                ConsoleManager.warn("AuthManager", "Kullanıcının pin bilgisi yanlıştı: " + username);
                throw new Error("Geçersiz pin. Lütfen tekrar deneyin.");
            }

            this.pendingRegistrations.delete(username);
            const pendingRegistrationsBelongsToEmail = Array.from(this.pendingRegistrations.values()).filter(pr => pr.email === email);
            pendingRegistrationsBelongsToEmail.forEach(pr => this.pendingRegistrations.delete(pr.username));
            this.forceRegister(email, username, password, ip);
            return;
        }

        if (!pin) {
            const pin = Util.generateNumericPin();
            this.pendingRegistrations.set(username, { pin, email, password, username });

            EmailManager.getInstance().sendEmail(
                email,
                "OrleansMC Kayıt Doğrulama",
                undefined,
                pinMailTemplate.replace('{PIN}', pin)
            );
            return;
        }
    }

    public async forceRegister(email: string, username: string, password: string, ip?: string): Promise<void> {
        const hashedPassword = await bcrypt.hash(password, 10);
        ConsoleManager.info("AuthManager", "Kullanıcı kaydediliyor: " + username);

        const newUser: WebUser = {
            _id: username.toLocaleLowerCase(),
            email,
            username,
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date()
        };

        await MysqlManager.getInstance().registerToLimboAuth(username, hashedPassword, ip);
        await this.userCollection.updateOne({ _id: newUser._id }, { $set: newUser }, { upsert: true });

        ConsoleManager.info("AuthManager", "Kullanıcı kaydedildi: " + username);
    }

    public async getWebUser(username: string): Promise<WebUser | null> {
        return this.userCollection.findOne({ _id: username.toLocaleLowerCase() });
    }

    public async getWebUserByEmail(email: string): Promise<WebUser | null> {
        return this.userCollection.findOne({ email });
    }

    public async checkIP(ip: string): Promise<boolean> {
        try {
            const response = await axios.get(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=17035264`);
            const data = response.data;
            if (data.status != 'success') {
                return false;
            }
            if (data.proxy || data.vpn || data.tor || data.hosting) {
                return false;
            }
            return true
        } catch (error) {
            console.error('IP kontrolü yapılırken bir hata oluştu:', error);
            return false;
        }
    }

    public async getUserFromContext(ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>): Promise<WebUser | null> {
        let user = null;
        const jwt = ctx.req.cookies["orleans.jwt"];
        if (jwt) {
            const sessionId = JWTManager.getInstance().getSessionIdFromJWT(jwt);
            if (sessionId) {

                const session = await SessionManager.getInstance().getSession(sessionId);
                if (session) {
                    const ip = (ctx.req.headers['x-real-ip'] || ctx.req.socket.remoteAddress) as string;

                    if (!session.ips.includes(ip)) {
                        session.ips.push(ip);
                        await SessionManager.getInstance().updateSession(session);
                    }

                    user = await AuthManager.getInstance().getWebUser(session.username) || null;
                }
            }
        }
        return user;
    }
}