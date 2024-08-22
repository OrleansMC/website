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
}