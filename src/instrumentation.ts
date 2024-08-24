import BlogManager from "./lib/server/blogs/BlogManager"

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        await BlogManager.getInstance().fetchBlogs();
    }
}