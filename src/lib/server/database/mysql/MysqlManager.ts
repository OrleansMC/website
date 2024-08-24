import ConsoleManager from '../../logs/ConsoleManager';
import AuthModel from './AuthModel';

declare global {
    var mysqlManager: MysqlManager;
}

export default class MysqlManager {
    public static getInstance(): MysqlManager {
        if (!global.mysqlManager) {
            global.mysqlManager = new MysqlManager();
        }

        return global.mysqlManager;
    }

    public async registerToLimboAuth(username: string, hashedPassword: string, ip?: string): Promise<void> {
        await AuthModel.upsert({
            NICKNAME: username,
            LOWERCASENICKNAME: username.toLowerCase(),
            HASH: hashedPassword,
            IP: ip,
            TOTPTOKEN: undefined,
            REGDATE: Date.now(),
            UUID: undefined,
            PREMIUMUUID: undefined,
            LOGINIP: undefined,
            LOGINDATE: undefined,
            ISSUEDTIME: Date.now()
        });

        ConsoleManager.info('MysqlManager', `Registered user ${username} to LimboAuth`);
    }
}