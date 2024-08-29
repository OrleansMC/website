import axios from "axios"


export type RankPrivileges = {
    rank: string;
    color: string;
    groups: {
        title: string;
        privileges: {
            icon_id: string;
            text: string;
        }[];
    }[];
}


export type PublicRank = {
    id: number;
    attributes: {
        privileges: RankPrivileges;
        title: string,
        credit_market_id: string,
        discount_percentage: number | null,
        discount_end_date: string | null,
        icon: StrapiImage,
        price: number | null;
    }
}

export type Rank = {
    attributes: {
        commands: string[] | null;
        item: string | null;
        publishedAt: string;
    }
} & PublicRank;

export type CreditMarketProduct = {
    id: string;
    name: string;
    description: string;
    commands: string[];
    item: string;
    amount: number;
    price: number;
}

export type CreditMarket = {
    ranks: CreditMarketProduct[];
    crates: CreditMarketProduct[];
}

declare global {
    var rankManager: RankManager;
}

export default class RankManager {
    public ranks: Rank[] = [];


    private constructor() {
        setInterval(async () => {
            await this.fetchRanks();
        }, 1000 * 10);
    }

    public static getInstance(): RankManager {
        if (!global.rankManager) {
            global.rankManager = new RankManager();
        }

        return global.rankManager;
    }

    public getPublicRanks(): PublicRank[] {
        return this.ranks.map((rank) => {
            return {
                id: rank.id,
                attributes: {
                    title: rank.attributes.title,
                    credit_market_id: rank.attributes.credit_market_id,
                    discount_percentage: rank.attributes.discount_percentage,
                    discount_end_date: rank.attributes.discount_end_date,
                    icon: rank.attributes.icon,
                    price: rank.attributes.price,
                    privileges: rank.attributes.privileges,
                }
            }
        });
    }

    public getRankByCreditMarketId(creditMarketId: string): Rank | null {
        return this.ranks.find((rank) => rank.attributes.credit_market_id === creditMarketId) || null;
    }

    public async fetchRanks(): Promise<Rank[]> {
        try {
            const result = await axios.get(process.env.STRAPI_URL + "/api/ranks?populate=*",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`
                    }
                }).then((response) => response.data as { data: Rank[] });

            const creditMarket = await axios.get(process.env.STRAPI_URL + "/api/credit-market",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`
                    }
                }).then((response) => response.data.data.attributes.products as CreditMarket);

            this.ranks = result.data.map((rank) => {
                const creditMarketProduct = creditMarket.ranks.find((product) => product.id === rank.attributes.credit_market_id);
                const rankResult = {
                    id: rank.id,
                    attributes: {
                        title: rank.attributes.title,
                        credit_market_id: rank.attributes.credit_market_id,
                        discount_percentage: rank.attributes.discount_percentage || null,
                        discount_end_date: rank.attributes.discount_end_date || null,
                        price: creditMarketProduct?.price || null,
                        item: creditMarketProduct?.item || null,
                        privileges: rank.attributes.privileges,
                        commands: creditMarketProduct?.commands || null,
                        publishedAt: rank.attributes.publishedAt,
                        icon: {
                            data: {
                                attributes: {
                                    name: rank.attributes.icon.data.attributes.name,
                                    width: rank.attributes.icon.data.attributes.width,
                                    height: rank.attributes.icon.data.attributes.height,
                                    url: rank.attributes.icon.data.attributes.url,
                                    blurhash: rank.attributes.icon.data.attributes.blurhash,
                                    formats: {
                                        thumbnail: {
                                            url: rank.attributes.icon.data.attributes.formats.thumbnail.url,
                                            width: rank.attributes.icon.data.attributes.formats.thumbnail.width,
                                            height: rank.attributes.icon.data.attributes.formats.thumbnail.height
                                        }
                                    }
                                }
                            }
                        }
                    }
                }


                if (rankResult.attributes.discount_percentage && rankResult.attributes.discount_end_date) {
                    const end_date = new Date(rankResult.attributes.discount_end_date);
                    const now = new Date();
                    if (end_date < now) {
                        rankResult.attributes.discount_percentage = null;
                        rankResult.attributes.discount_end_date = null;
                    }
                }

                if (rankResult.attributes.price && rankResult.attributes.discount_percentage) {
                    rankResult.attributes.price = rankResult.attributes.price + (rankResult.attributes.price * (rankResult.attributes.discount_percentage / 100));
                }
                return rankResult;
            }).sort((a, b) => {
                return new Date(a.attributes.publishedAt).getTime() - new Date(b.attributes.publishedAt).getTime();
            });
            return this.ranks;
        } catch (error) {
            console.error("Error fetching ranks", error);
            return [];
        }
    }
}