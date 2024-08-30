import ConsoleManager from "../../logs/ConsoleManager";
import LuckPermsUserPermissions from "./LuckPermsUsersModel";
import { Op } from 'sequelize';
import fs from 'fs';
import RedisManager from "../redis/RedisManager";
import DiscordOauth2Manager from "../../discord/DiscordOauth2Manager";
import { pushMetadata } from "../../discord/MetadataUtil";
import PlayerManager from "../../auth/PlayerManager";

declare global {
    var permsManager: PermsManager;
    var userPermissionsMap: Map<string, string[]>;
}

export default class PermsManager {
    constructor() {
        ConsoleManager.info('PermsManager', 'PermsManager initialized');
        if (!global.userPermissionsMap) {
            global.userPermissionsMap = new Map();
            if (!fs.existsSync('src/lib/server/database/mysql/permissions.json')) {
                fs.writeFileSync('src/lib/server/database/mysql/permissions.json', '[]');
            }

            const jsonArray = JSON.parse(
                fs.readFileSync('src/lib/server/database/mysql/permissions.json', { encoding: 'utf-8' })
            )

            jsonArray.forEach((json: any) => {
                userPermissionsMap.set(json.uuid, json.permissions);
            });
        }

        setInterval(this.checkPermissions, 10000);
    }

    public static getInstance(): PermsManager {
        if (!global.permsManager) {
            global.permsManager = new PermsManager();
        }

        return global.permsManager;
    }

    getPlayerPrimaryGroupByUUID(uuid: string) {
        const permissions = userPermissionsMap.get(uuid) || [];
        if (permissions.includes('group.legend')) {
            return 'legend';
        } else if (permissions.includes('group.yuce')) {
            return 'yuce';
        } else if (permissions.includes('group.titan')) {
            return 'titan';
        } else if (permissions.includes('group.lord')) {
            return 'lord';
        } else {
            return null;
        }
    }

    // İzinleri kontrol eden fonksiyon
    async checkPermissions() {
        try {
            const permissionsToCheck = ['group.lord', 'group.titan', 'group.yuce', 'group.legend'];
            const results = await LuckPermsUserPermissions.findAll({
                where: {
                    permission: {
                        [Op.in]: permissionsToCheck
                    },
                },
            });

            // Yeni izinleri geçici bir Map'e yükle
            const newPermissionsMap = new Map();

            results.forEach((result: any) => {
                const { uuid, permission } = result as any;

                if (!newPermissionsMap.has(uuid)) {
                    newPermissionsMap.set(uuid, []);
                }
                newPermissionsMap.get(uuid).push(permission);
            });

            // Eski Map ile yeni Map'i karşılaştır

            for (const [uuid, permissions] of newPermissionsMap) {
                const oldPermissions = userPermissionsMap.get(uuid) || [];

                // Eklenen izinler
                const addedPermissions = permissions.filter((perm: any) => !oldPermissions.includes(perm));
                // Kaldırılan izinler
                const removedPermissions = oldPermissions.filter((perm: any) => !permissions.includes(perm));

                if (addedPermissions.length > 0 || removedPermissions.length > 0) {
                    const player = await PlayerManager.getInstance().getPlayerByUUID(uuid);
                    if (!player || !player.uuid) continue;
                    const playerName = player.name;
                    const discordAccount = await DiscordOauth2Manager.getInstance().getAccount(playerName);
                    if (!discordAccount) continue;

                    await pushMetadata(discordAccount.access_token, {
                        oyuncu: 1,
                        lord: permissions.includes('group.lord') ? 1 : 0,
                        titan: permissions.includes('group.titan') ? 1 : 0,
                        yuce: permissions.includes('group.yuce') ? 1 : 0,
                        legend: permissions.includes('group.legend') ? 1 : 0
                    });

                    ConsoleManager.info('PermsManager', `${playerName} oyuncusunun metadatası güncellendi`);
                }
            }

            userPermissionsMap.clear();
            newPermissionsMap.forEach((permissions, uuid) => {
                userPermissionsMap.set(uuid, permissions);
            });

            const jsonArray: any[] = [];
            userPermissionsMap.forEach((permissions, uuid) => {
                jsonArray.push({ uuid, permissions });
            });
            fs.writeFileSync('src/lib/server/database/mysql/permissions.json', JSON.stringify(jsonArray, null, 2));
        } catch (error) {
            console.error('Hata:', error);
        }
    }
}
