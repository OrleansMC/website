import Image from "next/image";
import React from "react";
import Button from "../common/Button";
import Link from "next/link";
import { Blog } from "@/lib/server/blogs/BlogManager";
import Util from "@/lib/common/Util";

type NewsProps = {
    lastBlog: Blog
}

export default function News({ lastBlog }: NewsProps) {
    return (
        <section className="flex flex-col justify-center items-center space-y-8" data-aos="fade-up" data-offset="100">
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl font-semibold mb-3"
                >OrleansMC Haberler</h2>
                <p className="text-lg text-center text-zinc-400"
                >OrleansMC sunucusu ile ilgili haberler ve güncellemeler</p>
            </div>
            <div className="lg:max-w-[40rem]">
                <Link
                    className="flex flex-row items-end lg:items-center space-x-8 hover:shadow-lg p-8 
                    rounded-lg bg-dark-950 hover:bg-dark-900 transition-transform
                    lg:flex-col lg:space-x-0 lg:space-y-8"
                    href={`/haberler${lastBlog?.attributes.path}`}>
                    <div className="relative rounded-lg overflow-hidden flex-[1_0_0%]">
                        <Image
                            src={lastBlog?.attributes.thumbnail.data.attributes.url}
                            alt={lastBlog?.attributes.title}
                            width={245 * 3}
                            height={53 * 3}
                        />
                    </div>
                    <div className="flex-[1_0_0%] lg:text-center">
                        <h3 className="text-2xl font-semibold mb-2">{lastBlog?.attributes.title}</h3>
                        <span className="text-zinc-500 text-lg">
                            <span className={"font-semibold"} style={{ color: Util.getBlogCategoryColor(lastBlog?.attributes.category) }}>
                                {lastBlog?.attributes.category}
                            </span>
                            <span className="mx-2">
                                -
                            </span>
                            <span>
                                {Util.dateToString(lastBlog?.attributes.publishedAt ?? new Date())}
                            </span>
                        </span>
                        <p className="text-lg text-zinc-400 mt-6 leading-8 text-pretty">
                            {Util.cleanMarkdown(lastBlog?.attributes.description).slice(0, 320)}...
                        </p>
                    </div>
                </Link>
            </div>
            <div>
                <Button type="link" href="/haberler" className="bg-purple-500 hover:bg-purple-400 py-3">
                    Tüm Haberleri Gör
                </Button>
            </div>
        </section>
    )
}