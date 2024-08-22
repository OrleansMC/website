import axios from "axios"

export type Blog = {
    id: number;
    attributes: {
        title: string;
        category: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        thumbnail: StrapiImage;
        path: string;
    }
}

declare global {
    var BlogManager: BlogManager;
}

export default class BlogManager {
    public blogs: Blog[] = [];


    private constructor() {
        setInterval(async () => {
            await this.fetchBlogs();
        }, 1000 * 10);
    }

    public static getInstance(): BlogManager {
        if (!global.BlogManager) {
            global.BlogManager = new BlogManager();
        }

        return global.BlogManager;
    }

    public async fetchBlogs(): Promise<Blog[]> {
        try {
            const result = await axios.get(process.env.STRAPI_URL + "/api/blogs?populate=*",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`
                    }
                }).then((response) => response.data as { data: Blog[] });

            this.blogs = result.data.map((blog) => {
                return {
                    id: blog.id,
                    attributes: {
                        title: blog.attributes.title,
                        category: blog.attributes.category,
                        description: blog.attributes.description,
                        createdAt: blog.attributes.createdAt,
                        updatedAt: blog.attributes.updatedAt,
                        publishedAt: blog.attributes.publishedAt,
                        path: blog.attributes.path,
                        thumbnail: {
                            data: {
                                attributes: {
                                    name: blog.attributes.thumbnail.data.attributes.name,
                                    width: blog.attributes.thumbnail.data.attributes.width,
                                    height: blog.attributes.thumbnail.data.attributes.height,
                                    url: blog.attributes.thumbnail.data.attributes.url,
                                    blurhash: blog.attributes.thumbnail.data.attributes.blurhash
                                }
                            }
                        }
                    }
                }
            }).sort((a, b) => {
                return new Date(b.attributes.publishedAt).getTime() - new Date(a.attributes.publishedAt).getTime();
            });
            return this.blogs;
        } catch (error) {
            console.error("Error fetching blogs", error);
            return [];
        }
    }
}