import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ServerInfo = {
    player_count: number;
    online: boolean;
}

export const config = {
  api: {
    method: "GET",
  },
};

declare global {
    var cachedServerInfo: {
        info: ServerInfo;
        lastUpdate: number;
    };
}

global.cachedServerInfo = {
    info: {
        player_count: 0,
        online: true
    },
    lastUpdate: 0
};
const cachedServerInfo = global.cachedServerInfo;

async function getPlayerCount() {
    let serverInfo = cachedServerInfo.info;
    if ((cachedServerInfo.lastUpdate + (10 * 1000)) <= Date.now()) {

        serverInfo = await axios.get(
            `https://api.mcsrvstat.us/2/${encodeURI('orleansmc.com')}`
        ).then((res) => {
            return {
                player_count: res.data?.players?.online || 0,
                online: res.data?.online || false
            };
        }).catch(() => {
            return {
                player_count: 0,
                online: false
            };
        });

        cachedServerInfo.info = serverInfo;
        cachedServerInfo.lastUpdate = Date.now();
    }
    return serverInfo;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ServerInfo>) {
    const info = await getPlayerCount();
    res.status(200).json(info);
}