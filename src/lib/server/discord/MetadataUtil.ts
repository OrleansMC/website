import axios from "axios";
import ConsoleManager from "../logs/ConsoleManager";

declare global {
    var pendingMetadatas: { accessToken: string, body: any }[];
    var pendingMetadatasInterval: NodeJS.Timeout;
}

if (!global.pendingMetadatas) {
    global.pendingMetadatas = [];
}

if (!global.pendingMetadatasInterval) {
    global.pendingMetadatasInterval = setInterval(async () => {
        if (global.pendingMetadatas.length > 0) {
            const metadata = global.pendingMetadatas.pop();
            if (!metadata) {
                return;
            }
            const url = `https://discord.com/api/users/@me/applications/${process.env.CLIENT_ID}/role-connection`;

            const response = await axios.put(url, metadata.body, {
                headers: {
                    Authorization: `Bearer ${metadata.accessToken}`,
                    'Content-Type': 'application/json',
                },
            }).catch((err) => {
                ConsoleManager.error('MetadataUtil', 'Error pushing discord metadata: ' + err);
                throw err;
            });

            if (response.status !== 200) {
                ConsoleManager.error('MetadataUtil', `Error pushing discord metadata: [${response.status}] ${response.statusText}`);
            } else {
                ConsoleManager.info('MetadataUtil', 'Discord metadata pushed: ' + JSON.stringify(metadata.body));
            }
        }
    }, 1000);
}

/**
 * Given metadata that matches the schema, push that data to Discord on behalf
 * of the current user.
 */
export async function pushMetadata(accessToken: string, metadata: any) {
    // PUT /users/@me/applications/:id/role-connection
    const body = {
        platform_name: 'OrleansMC Role Connection',
        metadata,
    };
    global.pendingMetadatas.push({ accessToken, body });
}

/**
 * Fetch the metadata currently pushed to Discord for the currently logged
 * in user, for this specific bot.
 */
export async function getMetadata(accessToken: string) {
    // GET /users/@me/applications/:id/role-connection
    const url = `https://discord.com/api/users/@me/applications/${process.env.CLIENT_ID}/role-connection`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (response.status !== 200) {
        throw new Error(`Error getting discord metadata: [${response.status}] ${response.statusText}`);
    }

    return response.data;
}

export async function registerMetadata() {
    const url = `https://discord.com/api/applications/${process.env.CLIENT_ID}/role-connections/metadata`;
    // supported types: number_lt=1, number_gt=2, number_eq=3 number_neq=4, datetime_lt=5, datetime_gt=6, boolean_eq=7, boolean_neq=8

    const body = [
        {
            key: 'oyuncu',
            name: 'Oyuncu',
            description: 'Discord hesabını eşlemiş oyuncu',
            type: 7,
        },
        {
            key: 'lord',
            name: 'Lord',
            description: 'Lord rütbesine sahip oyuncu',
            type: 7,
        },
        {
            key: 'titan',
            name: 'Titan',
            description: 'Titan rütbesine sahip oyuncu',
            type: 7,
        },
        {
            key: 'yuce',
            name: 'Yüce',
            description: 'Yüce rütbesine sahip oyuncu',
            type: 7,
        },
        {
            key: 'legend',
            name: 'Legend',
            description: 'Legend rütbesine sahip oyuncu',
            type: 7,
        },
    ];

    const response = await axios.put(url, body, {
        headers: {
            Authorization: `Bot ${process.env.BOT_TOKEN}`,
            'Content-Type': 'application/json',
        },
    }).catch((err) => {
        ConsoleManager.error('MetadataUtil', 'Error pushing discord metadata schema: ' + err);
        throw err;
    });

    if (response.status !== 200) {
        throw new Error(`Error pushing discord metadata schema: [${response.status}] ${response.statusText}`);
    } else {
        ConsoleManager.info('MetadataUtil', 'Discord metadata schema registered: ' + JSON.stringify(body));
    }
}