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
}