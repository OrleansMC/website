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
import { GetServerSidePropsContext, NextApiRequest, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import ConsoleManager from "../logs/ConsoleManager";
import PlayerManager, { Player } from "./PlayerManager";
import DiscordOauth2Manager, { DiscordUser } from "../discord/DiscordOauth2Manager";
import crypto from "crypto";
import requestIp from 'request-ip';

declare global {
    var authManager: AuthManager;
}

type UserCommon = {
    _id: string;
    email: string;
    username: string;
    created_at: string;
    updated_at: string;
}

export type WebUser = {
    password: string;
} & UserCommon;

export type User = {
    player: Player;
    discord: DiscordUser | null;
} & UserCommon;


export type PendingRegistration = {
    pin: string;
    email: string;
    password: string;
    username: string;
}

export type ResetPasswordRequest = {
    username: string;
    key: string;
    created_at: Date;
}

const pinMailTemplate: string = fs.readFileSync('src/lib/server/email/PINTemplate.html', { encoding: 'utf-8' });

export default class AuthManager {
    public userCollection: Collection<WebUser>;
    public resetPasswordRequests: Collection<ResetPasswordRequest>;
    public pendingRegistrations: Map<string, PendingRegistration>;

    private constructor() {
        ConsoleManager.info("AuthManager", "AuthManager initialized.");
        this.userCollection = MongoManager.getInstance().websiteDatabase.collection<WebUser>("users");
        this.resetPasswordRequests = MongoManager.getInstance().websiteDatabase.collection("reset_password_requests");
        this.pendingRegistrations = new Map();

        setInterval(async () => {
            const resetPasswordRequests = await this.resetPasswordRequests.find({
                created_at: {
                    $lt: new Date(Date.now() - 1000 * 60 * 5)
                }
            }).toArray();

            for (const resetPasswordRequest of resetPasswordRequests) {
                await this.resetPasswordRequests.deleteOne({ username: resetPasswordRequest.username });
            }
        }, 1000 * 60);
    }

    public static getInstance(): AuthManager {
        if (!global.authManager) {
            global.authManager = new AuthManager();
        }

        return global.authManager;
    }

    public generateCookie(jtwToken: string): string {
        return `orleans.token=${jtwToken}; HttpOnly;${process.env.NODE_ENV === 'production' ? " Secure;" : ""
            } Max-Age=${7 * 24 * 60 * 60}; Path=/`
    }

    public async login(username: string, password: string, ip: string): Promise<string> {
        const user = await this.getWebUser(username);
        if (!user) {
            throw new Error("Kullanıcı adı veya şifre yanlış.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Kullanıcı adı veya şifre yanlış.");
        }

        const session = await SessionManager.getInstance().createSession(username, ip);
        const JWT = JWTManager.getInstance().generateToken(session.token);
        ConsoleManager.info("AuthManager", "Kullanıcı giriş yaptı: " + username);
        return JWT;
    }

    public async changePassword(username: string, oldPassword: string, newPassword: string): Promise<void> {
        const user = await this.getWebUser(username);
        if (!user) {
            throw new Error("Kullanıcı bulunamadı.");
        }

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            throw new Error("Eski şifre yanlış.");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await MysqlManager.getInstance().changePassword(username, hashedPassword);
        await this.userCollection.updateOne({ _id: username }, { $set: { password: hashedPassword } });
        ConsoleManager.info("AuthManager", "Kullanıcı şifresi değiştirildi: " + username);
    }

    public async generateResetPasswordToken(username: string): Promise<string> {
        const user = await this.getWebUser(username);
        if (!user) {
            throw new Error("Kullanıcı bulunamadı.");
        }

        const key = crypto.randomBytes(32).toString('hex');
        await this.resetPasswordRequests.insertOne({
            username,
            key,
            created_at: new Date()
        });

        return JWTManager.getInstance().generateResetPasswordToken(key);
    }

    public async resetPassword(token: string, newPassword: string): Promise<void> {
        const key = JWTManager.getInstance().getKeyFromForgotPasswordToken(token);
        if (!key) {
            throw new Error("Geçersiz token.");
        }

        const resetPasswordRequest = await this.resetPasswordRequests.findOne({ key });
        if (!resetPasswordRequest) {
            throw new Error("Geçersiz token.");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await MysqlManager.getInstance().changePassword(resetPasswordRequest.username, hashedPassword);
        await this.userCollection.updateOne({ _id: resetPasswordRequest.username }, { $set: { password: hashedPassword } });
        await this.resetPasswordRequests.deleteOne({ key });
        ConsoleManager.info("AuthManager", "Kullanıcı şifresi sıfırlandı: " + resetPasswordRequest.username);
    }

    public async validateResetPasswordToken(token: string): Promise<boolean> {
        const key = JWTManager.getInstance().getKeyFromForgotPasswordToken(token);
        if (!key) {
            return false;
        }

        const resetPasswordRequest = await this.resetPasswordRequests.findOne({ key });
        if (!resetPasswordRequest) {
            return false;
        }

        return true;
    }

    public async register(email: string, username: string, password: string, pin?: string, ip?: string): Promise<boolean> {
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
            if (theSessionHasSameIP.length > 2) {
                ConsoleManager.warn("AuthManager", "Bu IP adresi ile çok fazla hesap var: " + ip);
                throw new Error("Hesap oluşturmayı suistimal etmek sunucudan yasaklanmanıza sebep olabilir." +
                    " Durum yetkililere bildirildi! Lütfen destek açın.");
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
            await this.forceRegister(email, username, password, ip);
            ConsoleManager.info("AuthManager", "Kullanıcı kaydedildi: " + username);
            return true;
        }

        if (!pin) {
            if (ip && !this.checkIP(ip)) {
                ConsoleManager.warn("AuthManager", "Kullanıcı kaydı yapılırken proxy veya vpn tespit edildi: " + ip + " - " + username);
                throw new Error("Proxy veya VPN kullanarak kayıt olamazsınız.");
            }
            const pin = Util.generateNumericPin();
            this.pendingRegistrations.set(username, { pin, email, password, username });

            EmailManager.getInstance().sendEmail(
                email,
                "OrleansMC Kayıt Doğrulama",
                undefined,
                pinMailTemplate.replace('{PIN}', pin)
            );
            return false;
        }
        return false;
    }

    public async forceRegister(email: string, username: string, password: string, ip?: string): Promise<void> {
        const hashedPassword = await bcrypt.hash(password, 10);
        ConsoleManager.info("AuthManager", "Kullanıcı kaydediliyor: " + username);

        const newUser: WebUser = {
            _id: username.toLocaleLowerCase(),
            email,
            username,
            password: hashedPassword,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        await MysqlManager.getInstance().registerToLimboAuth(username, hashedPassword, ip);
        await this.userCollection.updateOne({ _id: newUser._id }, { $set: newUser }, { upsert: true });

        ConsoleManager.info("AuthManager", "Kullanıcı kaydedildi: " + username);
    }

    public async getUserFromSessionToken(sessionToken: string): Promise<User | null> {
        const session = await SessionManager.getInstance().getSession(sessionToken);
        if (!session) {
            return null;
        }

        return await this.getUser(session.username);
    }

    public async getWebUser(username: string): Promise<WebUser | null> {
        return this.userCollection.findOne({ _id: username.toLocaleLowerCase() });
    }

    public async getWebUserByEmail(email: string): Promise<WebUser | null> {
        return this.userCollection.findOne({ email });
    }

    public async getUser(username: string): Promise<User | null> {
        const datas = await Promise.all([
            PlayerManager.getInstance().getPlayer(username),
            this.getWebUser(username),
            DiscordOauth2Manager.getInstance().getUser(username)
        ]);

        const player = datas[0];
        const webUser = datas[1];
        const discord = datas[2];

        if (!webUser) {
            return null;
        }

        const user: User & { password?: string } = { ...webUser, player, discord };
        delete user.password;

        return user;
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

    public async getUserFromContext(ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>): Promise<User | null> {
        let user = null;
        const jwt = ctx.req.cookies["orleans.token"];
        if (jwt) {
            const sessionId = JWTManager.getInstance().getSessionTokenFromJWT(jwt);
            if (sessionId) {

                const session = await SessionManager.getInstance().getSession(sessionId);
                if (session) {
                    const ip = AuthManager.getInstance().getIpFromRequest(ctx.req as any) || "unknown";

                    if (!session.ips.includes(ip)) {
                        session.ips.push(ip);
                        await SessionManager.getInstance().updateSession(session);
                    }

                    user = await AuthManager.getInstance().getUser(session.username) || null;
                }
            }
        }
        return user;
    }

    public getIpFromRequest(req: NextApiRequest) {
        return requestIp.getClientIp(req);
    }
}