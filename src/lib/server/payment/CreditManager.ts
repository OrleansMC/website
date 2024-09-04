import PlayerManager from "../auth/PlayerManager";
import ActionManager from "../database/mongo/ActionManager";

declare global {
    var creditManager: CreditManager;
}

export default class CreditManager {
    public static getInstance(): CreditManager {
        if (!global.creditManager) {
            global.creditManager = new CreditManager();
        }

        return global.creditManager;
    }

    public async addCredit(playerName: string, amount: number, reason: string) {
        const player = await PlayerManager.getInstance().getPlayer(playerName);
        const oldCredit = player.credit;
        await PlayerManager.getInstance().setCredit(player.name, oldCredit + amount);
        await ActionManager.getInstance().sendAction(
            {
                type: "COMMAND",
                reason: reason,
                server_type: null,
                command: `money ${player.name} CREDIT set ${oldCredit + amount}`,
                date: new Date(),
            },
        );
    }
}