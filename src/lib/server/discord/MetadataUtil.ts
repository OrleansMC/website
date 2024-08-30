import axios from "axios";
import ConsoleManager from "../logs/ConsoleManager";

/**
 * Given metadata that matches the schema, push that data to Discord on behalf
 * of the current user.
 */
export async function pushMetadata(accessToken: string, metadata: any) {
    // PUT /users/@me/applications/:id/role-connection
    const url = `https://discord.com/api/users/@me/applications/${process.env.CLIENT_ID}/role-connection`;
    const body = {
        platform_name: 'OrleansMC Role Connection',
        metadata,
    };
    const response = await axios.put(url, body, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    console.log('pushMetadata', response.data);

    if (response.status !== 200) {
        throw new Error(`Error pushing discord metadata: [${response.status}] ${response.statusText}`);
    }
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
        }
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