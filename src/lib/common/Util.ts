export default class Util {
    public static getBlogCategoryColor(tag: string): string {
        switch (tag) {
            case "Dev":
                return "#FFD700";
            case "Duyuru":
                return "#FF4500";
            case "Güncelleme":
                return "#00FF00";
            case "Etkinlik":
                return "#1E90FF";
            default:
                return "#000000";
        }
    }

    public static cleanMarkdown(text: string) {
        if (!text) return '';
        // Başlıkları kaldır (örn. ## Başlık)
        text = text.replace(/#+\s+/g, '');

        // Kod bloklarını kaldır (```)
        text = text.replace(/```[\s\S]*?```/g, '');

        // Inline kodları kaldır (`code`)
        text = text.replace(/`([^`]+)`/g, '$1');

        // Bold ve italik kaldır (***bold ve italik***, **bold**, *italik*, __bold__, _italik_)
        text = text.replace(/(\*\*\*|___)(.*?)\1/g, '$2');
        text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
        text = text.replace(/(\*|_)(.*?)\1/g, '$2');

        // Linkleri kaldır (örn. [link metni](url))
        text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

        // Görselleri kaldır (örn. ![alt metni](url))
        text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');

        // Liste işaretçilerini kaldır (örn. - madde, * madde, + madde)
        text = text.replace(/^[\*\-\+]\s+/gm, '');

        // Numaralı liste işaretçilerini kaldır (örn. 1. madde)
        text = text.replace(/^\d+\.\s+/gm, '');

        // Blockquote işaretlerini kaldır (örn. > alıntı)
        text = text.replace(/^>\s+/gm, '');

        // Yatay çizgileri kaldır (---, ***, ___)
        text = text.replace(/^-{3,}|^\*{3,}|^_{3,}/gm, '');

        // Diğer markdown kalıntılarını temizle (örneğin: satır başı boşluklar)
        text = text.replace(/\s{2,}/g, ' ');

        // Son olarak baştaki ve sondaki boşlukları temizle
        return text.trim();
    }

    public static isValidEmail(email: string) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|icloud\.com)$/;

        if (emailPattern.test(email)) {
            return true;
        }

        return false;
    }

    public static validatePassword(password: string) {
        if (!password) {
            throw new Error("Şifre boş olamaz.");
        }

        if (password.includes(" ") || password.includes("\t") || password.includes("\n")) {
            throw new Error("Şifre boşluk içeremez.");
        }

        if (password.length > 50) {
            throw new Error("Şifre çok uzun! En fazla 50 karakter olmalı.");
        }
        // Uzunluk kontrolü (En az 6 karakter)
        if (password.length < 6) {
            throw new Error("Şifre çok kısa! En az 6 karakter olmalı.");
        }

        /*// Büyük harf kontrolü
        const uppercasePattern = /[A-Z]/;
        if (!uppercasePattern.test(password)) {
            throw new Error("Şifre en az bir büyük harf içermelidir.");
        }

        // Küçük harf kontrolü
        const lowercasePattern = /[a-z]/;
        if (!lowercasePattern.test(password)) {
            throw new Error("Şifre en az bir küçük harf içermelidir.");
        }*/

        // Sayı kontrolü
        const numberPattern = /[0-9]/;
        if (!numberPattern.test(password)) {
            throw new Error("Şifre en az bir rakam içermelidir.");
        }
    }

    public static validateMinecraftNickname(nickname: string) {
        // Uzunluk kontrolü (En az 3, en fazla 16 karakter)
        if (nickname.length < 3) {
            throw new Error("Kullanıcı adı çok kısa! En az 3 karakter olmalı.");
        }
        if (nickname.length > 16) {
            throw new Error("Kullanıcı adı çok uzun! En fazla 16 karakter olmalı.");
        }

        // Geçerli karakterler kontrolü (sadece harfler, sayılar ve alt çizgi)
        const validCharacters = /^[a-zA-Z0-9_]+$/;
        if (!validCharacters.test(nickname)) {
            throw new Error("Kullanıcı adı yalnızca harfler, sayılar ve alt çizgi (_) içerebilir.");
        }

        // Harf veya sayı ile başlamalı
        const validStart = /^[a-zA-Z0-9]/;
        if (!validStart.test(nickname)) {
            throw new Error("Kullanıcı adı bir harf veya sayı ile başlamalı.");
        }

        // Harf veya sayı ile bitmeli
        const validEnd = /[a-zA-Z0-9]$/;
        if (!validEnd.test(nickname)) {
            throw new Error("Kullanıcı adı bir harf veya sayı ile bitmeli.");
        }
    }

    public static generateNumericPin() {
        let pin = '';
        for (let i = 0; i < 6; i++) {
            pin += Math.floor(Math.random() * 10).toString(); // 0-9 arası rastgele bir sayı ekle
        }
        return pin;
    }

    public static slugify(str: string) {
        return str
            .toString() // String'e çevir
            .normalize('NFD') // Unicode normalizasyonu (Türkçe karakterler için)
            .replace(/[\u0300-\u036f]/g, '') // Diakritik işaretlerini kaldır
            .replace(/ç/g, 'c') // Türkçe karakterleri dönüştür
            .replace(/ğ/g, 'g')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ş/g, 's')
            .replace(/ü/g, 'u')
            .replace(/Ç/g, 'C')
            .replace(/Ğ/g, 'G')
            .replace(/İ/g, 'I')
            .replace(/Ö/g, 'O')
            .replace(/Ş/g, 'S')
            .replace(/Ü/g, 'U')
            .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
            .replace(/[^\w\-]+/g, '') // Alfanumerik olmayan karakterleri kaldır
            .replace(/\-\-+/g, '-') // Birden fazla tireyi teke indir
            .replace(/^-+/, '') // Baştaki tireleri kaldır
            .replace(/-+$/, '') // Sondaki tireleri kaldır
            .toLowerCase(); // Hepsini küçük harfe çevir
    }

    public static msToTime(ms: number) {
        const sec_num = ms / 1000;
        const days = Math.floor(sec_num / 86400);
        const hours = Math.floor((sec_num - (days * 86400)) / 3600);
        const minutes = Math.floor((sec_num - (days * 86400) - (hours * 3600)) / 60);
        const seconds = sec_num - (days * 86400) - (hours * 3600) - (minutes * 60);

        let result = [];
        if (days > 0) result.push(`${days} Gün`);
        if (hours > 0) result.push(`${hours} Saat`);
        if ((minutes > 0) && (!days || !hours)) result.push(`${minutes} Dakika`);
        //if ((seconds > 0) && (!hours || !minutes)) result.push(`${minutes} Saniye`);

        return result.map((d) => `${d}`).join(", ");
    };

    public static getRankDisplayName(rank: string) {
        let rankDisplayName;
        switch (rank) {
            case "legend":
                rankDisplayName = "Efsane";
                break;
            case "yuce":
                rankDisplayName = "Yüce";
                break;
            case "titan":
                rankDisplayName = "Titan";
                break;
            case "legend":
                rankDisplayName = "Efsane";
                break;
            default:
                rankDisplayName = "Oyuncu";
                break;
        }
        return rankDisplayName;
    }

    static getRankColor(rank: string) {
        let rankColor;
        switch (rank) {
            case "legend":
                rankColor = "#8A6ADA";
                break;
            case "yuce":
                rankColor = "#da7fdb";
                break;
            case "titan":
                rankColor = "#d4a935";
                break;
            case "lord":
                rankColor = "#4A69D9";
                break;
            default:
                rankColor = "#949aa6";
                break;
        }
        return rankColor;
    }
}