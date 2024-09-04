type StrapiImage = {
    data: {
        attributes: {
            name: string;
            width: number;
            height: number;
            url: string;
            blurhash: string;
            formats: {
                thumbnail: {
                    url: string;
                    width: number;
                    height: number;
                }
            }
        }
    }
}