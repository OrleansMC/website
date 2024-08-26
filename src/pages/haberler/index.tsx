import BlogCard from '@/components/blogs/BlogCard'
import Layout from '@/layouts/Layout'
import Util from '@/lib/common/Util'
import AuthManager, { User } from '@/lib/server/auth/AuthManager'
import BlogManager, { Blog } from '@/lib/server/blogs/BlogManager'
import { PageProps } from '@/types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

type BlogsProps = InferGetServerSidePropsType<typeof getServerSideProps> & PageProps

export default function BlogsPage({ blogs, page, lastPage, user }: BlogsProps) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = React.useState(page);

    React.useEffect(() => {
        setCurrentPage(page);
    }, [page]);
    return (
        <Layout
            title="OrleansMC - Haberler"
            description="OrleansMC sunucusundaki en son güncellemeleri, etkinlikleri ve daha fazlasını buradan takip edebilirsiniz."
            ogDescription="OrleansMC sunucusundaki en son güncellemeleri, etkinlikleri ve daha fazlasını buradan takip edebilirsiniz."
            user={user}
        >
            <div className='mt-28 grid grid-cols-2 md:grid-cols-1 gap-12'>
                {
                    blogs.map((blog, index) => (
                        <BlogCard key={index} blog={blog} />
                    ))
                }
            </div>
            <div className="flex justify-between mt-12 items-center">
                <button
                    className="bg-dark-850 text-zinc-200 hover:bg-dark-800 cursor-pointer p-3 rounded-tl-lg rounded-bl-lg transition-transform transform-gpu"
                    onClick={() => {
                        if (currentPage - 1 === 1) {
                            setCurrentPage(1);
                            router.replace(`/haberler`, undefined, { shallow: false })
                            return;
                        }
                        if (currentPage - 1 === 0) {
                            setCurrentPage(lastPage);
                            router.replace(`/haberler?sayfa=${lastPage}`, undefined, { shallow: false })
                            return;
                        }
                        setCurrentPage(currentPage - 1);
                        router.replace(`/haberler?sayfa=${currentPage - 1}`, undefined, { shallow: false })
                    }}
                >
                    Geri
                </button>
                <span className="text-zinc-400 font-semibold text-lg">
                    <span className="text-purple-400"
                    >{currentPage}</span>
                    <span> / </span>
                    <span>{lastPage}</span>
                </span>
                <button
                    className="bg-dark-850 text-zinc-200 hover:bg-dark-800 cursor-pointer p-3 rounded-tr-lg rounded-br-lg transition-transform transform-gpu"
                    onClick={() => {
                        if (currentPage + 1 > lastPage) {
                            setCurrentPage(1);
                            router.replace(`/haberler`, undefined, { shallow: false })
                            return;
                        }
                        setCurrentPage(currentPage + 1);
                        router.replace(`/haberler?sayfa=${currentPage + 1}`, undefined, { shallow: false })
                    }}
                >
                    İleri
                </button>
            </div>
        </Layout>
    )
}


export const getServerSideProps = (async (ctx) => {
    const blogCountPerPage = 6;
    const page = parseInt(ctx.query.sayfa as string) || 1;
    const blogs = BlogManager.getInstance().blogs
    const lastPage = Math.floor(blogs.length / blogCountPerPage) + 1;
    if (page < 1) {
        return {
            redirect: {
                destination: '/haberler' + `?sayfa=${lastPage}`,
                permanent: false
            }
        }
    } else if (page > lastPage) {
        return {
            redirect: {
                destination: '/haberler' + `?sayfa=1`,
                permanent: false
            }
        }
    }
    return {
        props: {
            page: page,
            lastPage: lastPage,
            blogs: blogs.slice((page - 1) * blogCountPerPage, page * blogCountPerPage).map((blog) => {
                const newBlog = {
                    ...blog,
                    description: Util.cleanMarkdown(blog.attributes.description).slice(0, 150)
                };
                return newBlog;
            }),
            user: await AuthManager.getInstance().getUserFromContext(ctx)
        }
    }
}) satisfies GetServerSideProps<{ page: number, blogs: Blog[], user: User | null }>