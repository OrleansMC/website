import ConsoleManager from '../../logs/ConsoleManager';
import AuthModel from './AuthModel';
import PermsManager from './PermsManager';

declare global {
    var mysqlManager: MysqlManager;
}

export default class MysqlManager {
    public permsManager = PermsManager.getInstance();
    
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

    public async changePassword(username: string, hashedPassword: string): Promise<void> {
        await AuthModel.update({
            HASH: hashedPassword
        }, {
            where: {
                NICKNAME: username
            }
        });

        ConsoleManager.info('MysqlManager', `Changed password for user ${username}`);
    }
}