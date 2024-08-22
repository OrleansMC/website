import BlogManager from "./lib/server/BlogManager"

export async function register() {
    await BlogManager.getInstance().fetchBlogs();
}