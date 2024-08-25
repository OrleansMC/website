import Image from "next/image";
import React from "react";
import BlogManager, { Blog } from "@/lib/server/blogs/BlogManager";
import AuthManager from "@/lib/server/auth/AuthManager";
import Util from "@/lib/common/Util";
import { GetServerSideProps } from "next";
import Markdown from "react-markdown";
import Layout from "@/layouts/Layout";
import styles from "@/styles/blog.module.scss";
import { PageProps } from "@/types";
import { WebUser } from "@/lib/server/auth/AuthManager";

type BlogProps = {
    blog: Blog
    user: WebUser
} & PageProps;

export default function BlogPage({ blog, user }: BlogProps) {
    return (
        <Layout
            title={"OrleansMC - " + blog.attributes.title}
            description={Util.cleanMarkdown(blog.attributes.description).slice(0, 150)}
            ogDescription={Util.cleanMarkdown(blog.attributes.description).slice(0, 150)}
            user={user}
        >
            <div className="mt-28">
                <div data-aos="fade-up">
                    <Image
                        className="w-full rounded-lg"
                        src={blog.attributes.thumbnail.data.attributes.url}
                        alt="Blog Thumbnail"
                        width={750 * 2}
                        height={424 * 2}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={blog.attributes.thumbnail.data.attributes.formats.thumbnail.url}
                    />
                </div>
                <div className="mt-4 flex flex-col items-center space-y-4" data-aos="fade-up">
                    <h1 className="text-4xl font-semibold mt-8">{blog.attributes.title}</h1>
                    <span className="text-zinc-500 text-lg">
                        <span className={"font-semibold"} style={{ color: Util.getBlogCategoryColor(blog.attributes.category) }}>
                            {blog.attributes.category}
                        </span>
                        <span className="mx-2">
                            -
                        </span>
                        <span>
                            {new Date(blog.attributes.publishedAt).toLocaleDateString("tr-TR").replace(/\//g, ".")}
                        </span>
                    </span>
                </div>
                <div id="blog" className={styles.blog} data-aos="fade-up">
                    <Markdown>{blog.attributes.description}</Markdown>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = (async (ctx) => {
    const blog = BlogManager.getInstance().blogs.find(blog => blog.attributes.path === "/" + ctx.params?.blog);
    if (!blog) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            blog: blog,
            user: await AuthManager.getInstance().getUserFromContext(ctx)
        }
    }
}) satisfies GetServerSideProps<{ blog: Blog, user: WebUser | null }>