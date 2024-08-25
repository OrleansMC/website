export default class UUIDManager {
    private static instance: UUIDManager;

    private constructor() { }

    public static getInstance(): UUIDManager {
        if (!UUIDManager.instance) {
            UUIDManager.instance = new UUIDManager();
        }

        return UUIDManager.instance;
    }

    public async getUUID(username: string): Promise<string | null> {
        const UUIDDatas = JSON.parse(localStorage.getItem("uuids") || "{}");
        if (UUIDDatas[username]) return UUIDDatas[username];

        const response = await fetch(`https://api.ashcon.app/mojang/v2/user/${
            encodeURIComponent(username)
        }`);
        if (!response.ok) return null;

        const data = await response.json();
        let uuid = data.uuid;

        UUIDDatas[username] = uuid;
        if (Object.keys(UUIDDatas).length > 100) {
            delete UUIDDatas[Object.keys(UUIDDatas)[0]];
        }

        localStorage.setItem("uuids", JSON.stringify(UUIDDatas));
        return uuid;
    }
}