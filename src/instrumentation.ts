import BlogManager from "./lib/server/blogs/BlogManager"

export async function register() {
    await BlogManager.getInstance().fetchBlogs();
}