import BlogManager from "./lib/server/blogs/BlogManager";
import GuideManager from "./lib/server/guides/GuideManager";
import RanksManager from "./lib/server/store/RanksManager";

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        await BlogManager.getInstance().fetchBlogs();
        await GuideManager.getInstance().fetchGuides();
        await RanksManager.getInstance().fetchRanks();
    }
}