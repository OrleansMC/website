import BlogManager from "./lib/server/blogs/BlogManager"
import GuideManager from "./lib/server/guides/GuideManager";

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        await BlogManager.getInstance().fetchBlogs();
        await GuideManager.getInstance().fetchGuides();
    }
}