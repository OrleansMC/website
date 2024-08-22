import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Blog } from "@/lib/server/BlogManager";
import Util from "@/lib/common/Util";

type BlogCardProp = {
    blog: Blog
}

export default function BlogCard({ blog }: BlogCardProp) {
    return (
        <article className="flex flex-col justify-center items-center" data-aos="zoom-in">
            <Link
                className="flex flex-row lg:items-center gap-6 hover:shadow-lg
                transition-transform flex-col hover:scale-[1.03] p-8 rounded-lg bg-dark-950 hover:bg-dark-900 transform-gpu"
                href={`/haberler${blog.attributes.path}`}>
                <div className="relative rounded-lg overflow-hidden">
                    <Image
                        className=""
                        src="/uploads/fire_c244b1f02a.png"
                        alt="Haber 1"
                        width={750}
                        height={424}
                        placeholder="blur"
                        blurDataURL={"/_next/image?url=%2Fuploads%2Ffire_c244b1f02a.png&w=25&q=50"}
                    />
                </div>
                <div className="lg:text-center">
                    <h3 className="text-2xl font-semibold mb-2">{blog.attributes.title}</h3>
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
                    <p className="text-lg text-zinc-400 mt-2 leading-8 text-pretty">
                        {blog.attributes.description.slice(0, 150)}...
                    </p>
                </div>
            </Link>
        </article>
    )
}
