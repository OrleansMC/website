import Image from "next/image";
import React from "react";
import GuideManager, { Guide } from "@/lib/server/guides/GuideManager";
import AuthManager from "@/lib/server/auth/AuthManager";
import Util from "@/lib/common/Util";
import { GetServerSideProps } from "next";
import Markdown from "react-markdown";
import Layout from "@/layouts/Layout";
import styles from "@/styles/blog.module.scss";
import { PageProps } from "@/types";
import { User } from "@/lib/server/auth/AuthManager";
import Button from "@/components/common/Button";

type GuideProps = {
    guide: Guide
    user: User
} & PageProps;

GuidePage.getLayout = function getLayout(page: React.ReactNode, pageProps: GuideProps) {
    return (
        <Layout
            title={"OrleansMC - " + pageProps.guide.attributes.title}
            description={Util.cleanMarkdown(pageProps.guide.attributes.description).slice(0, 150)}
            ogDescription={Util.cleanMarkdown(pageProps.guide.attributes.description).slice(0, 150)}
            user={pageProps.user}
        >
            {page}
        </Layout>
    )
}

export default function GuidePage({ guide, user }: GuideProps) {
    return (
        <div className="mt-28">
            <div data-aos="fade-down" className="flex items-center bg-dark-800 p-8 md:p-6 rounded-lg shadow-lg md:flex-col md:gap-8">
                <div style={{ backgroundColor: guide.attributes.background }}
                    className="rounded-lg p-6 w-56 h-56 flex justify-center items-center lg:h-full">
                    <Image
                        className="w-fit h-48"
                        src={guide.attributes.icon.data.attributes.url}
                        alt={guide.attributes.title + " Icon"}
                        width={480}
                        height={480}
                        quality={100}
                        placeholder='empty'
                    />
                </div>
                <div className="ml-8 md:flex md:flex-col md:items-center md:gap-4 md:ml-0">
                    <div>
                        <h2 className="text-xl font-semibold uppercase text-zinc-400 md:text-center">{guide.attributes.sub_title}</h2>
                        <h1 className="text-4xl tracking-wider font-semibold mt-2 md:text-center">{guide.attributes.title}</h1>
                    </div>
                    <Button href={"/discord"}
                        blank
                        type="link"
                        className="bg-dark-200 hover:bg-dark-100 text-white !mt-3 w-fit absolute right-8 bottom-8 md:relative md:right-0 md:bottom-0">
                        Daha Fazla Bilgi
                    </Button>
                </div>
            </div>
            <div id="guide" className={styles.blog} data-aos="fade-up">
                <Markdown>{guide.attributes.description}</Markdown>
            </div>
        </div>
    )
}

export const getServerSideProps = (async (ctx) => {
    const guide = GuideManager.getInstance().guides.find(guide => guide.attributes.path === ctx.params?.guide);
    if (!guide) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            guide: guide,
            user: await AuthManager.getInstance().getUserFromContext(ctx)
        }
    }
}) satisfies GetServerSideProps<{ guide: Guide, user: User | null }>