import { Embed, Webhook } from '@vermaysha/discord-webhook'
import { User, WebUser } from '../auth/AuthManager';
import { BuyMeACoffeeData, BuyMeACoffeeExtra } from '@/pages/api/payment/buymeacoffee';

declare global {
    var pendingWebhooks: Webhook[];
    var pendingWebhooksInterval: NodeJS.Timeout;
}

if (!global.pendingWebhooks) {
    global.pendingWebhooks = [];
}

if (!global.pendingWebhooksInterval) {
    global.pendingWebhooksInterval = setInterval(() => {
        if (global.pendingWebhooks.length > 0) {
            const webhook = global.pendingWebhooks.shift();
            webhook?.send();
        }
    }, 500);
}

export default class WebhookManager {
    static sendWebsiteWebhook(source: string, message: string) {
        const webhook = new Webhook("https://discord.com/api/webhooks/1278432332109320242/zm0jdN1SZHUBBCMsq7idnZKnRXpGk7neo6AenO-ys0OYPixmhu6lQ2gHXu3GITZXg9JS");
        const embed = new Embed()
            .setTitle("Bir website logu geldi!")
            .addField({
                name: "Kaynak",
                value: source,
                inline: true
            })
            .addField({
                name: "Tarih",
                value: "<t:" + Math.floor(Date.now() / 1000) + ":F>",
                inline: true
            })
            .addField({
                name: "Mesaj",
                value: message
            })

        webhook.addEmbed(embed);
        global.pendingWebhooks.push(webhook);
    }

    static sendLoginWebhook(user: User, ip: string) {
        const webhook = new Webhook(
            "https://discord.com/api/webhooks/1278436335631470652/MfMVMN3LMyETTMYe5DvR5kF4N7b8a2wlgQiFH9XTL-8JgKFPLle6a4a0sr1vLysU7QTZ"
        );
        const embed = new Embed()
            .setTitle("Bir kullanıcı giriş yaptı!")
            .addField({
                name: "Kullanıcı",
                value: user.username,
                inline: true
            })
            .addField({
                name: "IP",
                value: "||" + ip + "||",
                inline: true
            })
            .addField({
                name: "Tarih",
                value: "<t:" + Math.floor(Date.now() / 1000) + ":F>",
                inline: false
            })
            .setColor("#00FF00");

        webhook.addEmbed(embed);
        global.pendingWebhooks.push(webhook);
    }

    static sendLogoutWebhook(user: User, ip: string) {
        const webhook = new Webhook(
            "https://discord.com/api/webhooks/1278436335631470652/MfMVMN3LMyETTMYe5DvR5kF4N7b8a2wlgQiFH9XTL-8JgKFPLle6a4a0sr1vLysU7QTZ"
        );
        const embed = new Embed()
            .setTitle("Bir kullanıcı çıkış yaptı!")
            .addField({
                name: "Kullanıcı",
                value: user.username,
                inline: true
            })
            .addField({
                name: "IP",
                value: "||" + ip + "||",
                inline: true
            })
            .addField({
                name: "Tarih",
                value: "<t:" + Math.floor(Date.now() / 1000) + ":F>",
                inline: false
            })
            .setColor("#FF0000");

        webhook.addEmbed(embed);
        global.pendingWebhooks.push(webhook);
    }

    static sendRegisterWebhook(user: User, ip: string) {
        const webhook = new Webhook(
            "https://discord.com/api/webhooks/1278436429856505978/0HJx5_kGXvezebxDsM0c572VZMfGWSVYqIo_BPm0zxbR2PRSRn61B4jwL9rR2CU0aOd9"
        );
        const embed = new Embed()
            .setTitle("Bir kullanıcı kayıt oldu!")
            .addField({
                name: "Kullanıcı",
                value: user.username,
                inline: true
            })
            .addField({
                name: "IP",
                value: "||" + ip + "||",
                inline: true
            })
            .addField({
                name: "Tarih",
                value: "<t:" + Math.floor(Date.now() / 1000) + ":F>",
                inline: false
            })
            .setColor("#00FF00");

        webhook.addEmbed(embed);
        global.pendingWebhooks.push(webhook);
    }

    static sendCreditMarketPurchaseWebhook(user: User, ip: string, product: string, price: number) {
        const webhook = new Webhook(
            "https://discord.com/api/webhooks/1275387372384817164/hM1GUoWpIgP10saM-kTOZKZuIKg6RzwEhzop1j-7CDnZaruLirElNI-u_Xd8ZX_ZOPy2"
        );
        const embed = new Embed()
            .setTitle("Bir Oyuncu Web Marketten Ürün Satın Aldı!")
            .addField({
                name: "Kullanıcı",
                value: user.username,
                inline: true
            })
            .addField({
                name: "IP",
                value: "||" + ip + "||",
                inline: true
            })
            .addField({
                name: "Ürün",
                value: product,
                inline: false
            })
            .addField({
                name: "Fiyat",
                value: price + " kredi",
                inline: true
            })
            .addField({
                name: "Tarih",
                value: "<t:" + Math.floor(Date.now() / 1000) + ":F>",
                inline: true
            })
            .setColor("#00FF00");

        webhook.addEmbed(embed);
        global.pendingWebhooks.push(webhook);
    }

    static sendCreditPurchaseFailedWebhook(product: BuyMeACoffeeData) {
        const webhook = new Webhook(
            "https://discord.com/api/webhooks/1280952460327915520/R3Kz-JoqKMb4i-7ilhTGCGwLl-v6FNbJdRV6A0waLrMJ5KK3rqBqTiObZUCBpmO558Q8"
        );
        const embed = new Embed()
            .setTitle("Kredi Satın Alan Oyuncu Bulunamadı!")
            .addField({
                name: "Kullanıcı",
                value: product.supporter_name,
                inline: true
            })
            .addField({
                name: "E-Posta",
                value: product.supporter_email,
                inline: true
            })
            .addField({
                name: "Satın Alınan Ürünler",
                value: product.extras.map((extra: BuyMeACoffeeExtra) => extra.title).join(", "),
                inline: false
            })
            .addField({
                name: "Toplam Ödeme",
                value: product.total_amount_charged + " USD",
                inline: true
            })
            .addField({
                name: "Tarih",
                value: "<t:" + Math.floor(Date.now() / 1000) + ":F>",
                inline: true
            })
            .setColor("#FF0000");

        webhook.addEmbed(embed);
        global.pendingWebhooks.push(webhook);
    }

    static sendCreditPurchaseWebhook(product: BuyMeACoffeeData, user: WebUser) {
        const webhook = new Webhook(
            "https://discord.com/api/webhooks/1280952460327915520/R3Kz-JoqKMb4i-7ilhTGCGwLl-v6FNbJdRV6A0waLrMJ5KK3rqBqTiObZUCBpmO558Q8"
        );
        const embed = new Embed()
            .setTitle("Kredi Satın Alan Oyuncu Bulundu!")
            .addField({
                name: "Kullanıcı",
                value: `${user.username} (${product.supporter_name})`,
                inline: true
            })
            .addField({
                name: "E-Posta",
                value: product.supporter_email,
                inline: true
            })
            .addField({
                name: "Satın Alınan Ürünler",
                value: product.extras.map((extra: BuyMeACoffeeExtra) => extra.title).join(", "),
                inline: false
            })
            .addField({
                name: "Toplam Ödeme",
                value: product.total_amount_charged + " USD",
                inline: true
            })
            .addField({
                name: "Tarih",
                value: "<t:" + Math.floor(Date.now() / 1000) + ":F>",
                inline: true
            })
            .setColor("#00FF00");

        webhook.addEmbed(embed);
        global.pendingWebhooks.push(webhook);
    }
}