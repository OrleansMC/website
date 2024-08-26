import Util from "@/lib/common/Util";
import axios from "axios"

export type Guide = {
    id: number;
    attributes: {
        title: string,
        sub_title: string,
        description: string,
        createdAt: Date,
        updatedAt: Date,
        publishedAt: Date,
        background: string,
        path: string,
        icon: StrapiImage,
    }
}

declare global {
    var guideManager: GuideManager;
}

export default class GuideManager {
    public guides: Guide[] = [];


    private constructor() {
        setInterval(async () => {
            await this.fetchGuides();
        }, 1000 * 10);
    }

    public static getInstance(): GuideManager {
        if (!global.guideManager) {
            global.guideManager = new GuideManager();
        }

        return global.guideManager;
    }

    public async fetchGuides(): Promise<Guide[]> {
        try {
            const result = await axios.get(process.env.STRAPI_URL + "/api/guides?populate=*",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`
                    }
                }).then((response) => response.data as { data: Guide[] });

            this.guides = result.data.map((guide) => {
                return {
                    id: guide.id,
                    attributes: {
                        title: guide.attributes.title,
                        sub_title: guide.attributes.sub_title,
                        description: guide.attributes.description,
                        createdAt: guide.attributes.createdAt,
                        updatedAt: guide.attributes.updatedAt,
                        publishedAt: guide.attributes.publishedAt,
                        background: guide.attributes.background,
                        path: Util.slugify(guide.attributes.title),
                        icon: {
                            data: {
                                attributes: {
                                    name: guide.attributes.icon.data.attributes.name,
                                    width: guide.attributes.icon.data.attributes.width,
                                    height: guide.attributes.icon.data.attributes.height,
                                    url: guide.attributes.icon.data.attributes.url,
                                    blurhash: guide.attributes.icon.data.attributes.blurhash,
                                    formats: {
                                        thumbnail: {
                                            url: guide.attributes.icon.data.attributes.formats.thumbnail.url,
                                            width: guide.attributes.icon.data.attributes.formats.thumbnail.width,
                                            height: guide.attributes.icon.data.attributes.formats.thumbnail.height
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }).sort((a, b) => {
                return new Date(b.attributes.publishedAt).getTime() - new Date(a.attributes.publishedAt).getTime();
            });
            return this.guides;
        } catch (error) {
            console.error("Error fetching guides", error);
            return [];
        }
    }
}