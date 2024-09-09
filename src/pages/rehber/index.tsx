import GuideCard from '@/components/guides/GuideCard'
import Layout from '@/layouts/Layout'
import AuthManager, { User } from '@/lib/server/auth/AuthManager'
import GuideManager, { Guide } from '@/lib/server/guides/GuideManager'
import { PageProps } from '@/types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

type GuidesProps = InferGetServerSidePropsType<typeof getServerSideProps> & PageProps


GuidesPage.getLayout = function getLayout(page: React.ReactNode, pageProps: PageProps) {
    return (
        <Layout
            title="OrleansMC - Rehber"
            description="Minecraft sunucumuz hakkında bilgi alabileceğiniz rehber sayfası."
            ogDescription="Minecraft sunucumuz hakkında bilgi alabileceğiniz rehber sayfası."
            user={pageProps.user}
        >
            {page}
        </Layout>
    )
}

export default function GuidesPage({ guides, user }: GuidesProps) {
    return (
        <>
            <div className='mt-28'>
                <div
                    data-aos="fade-down"
                    className='flex flex-col relative p-16 md:p-12 rounded-lg before:rounded-lg shadow-lg 
                    bg-[url("/uploads/sun_risepng_b3c86a759f.png")] bg-cover bg-center bg-no-repeat 
                    before:absolute before:top-0 before:left-0 before:w-full before:h-full 
                    before:bg-gradient-to-r 
                    before:from-purple-900/50 before:via-indigo-800/80 before:to-purple-800/50 
                    before:z-10'>
                    <h1 className='text-4xl font-semibold text-center z-20'>OrleansMC Rehberler</h1>
                    <p className='text-center text-xl mt-4 z-20'>Minecraft sunucumuz hakkında bilgi alabileceğiniz rehber sayfası.</p>
                </div>

                <div data-aos="fade-up"
                    className='mt-12 grid grid-cols-3 md:grid-cols-1 lg:grid-cols-2 gap-8'>
                    {
                        guides.map((guide, index) => (
                            <GuideCard key={index} guide={guide} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}


export const getServerSideProps = (async (ctx) => {
    return {
        props: {
            guides: GuideManager.getInstance().guides.map((guide) => {
                const newGuide: Guide = {
                    ...guide,
                    attributes: {
                        ...guide.attributes,
                        description: ''
                    }
                };
                return newGuide;
            }).reverse(),
            user: await AuthManager.getInstance().getUserFromContext(ctx)
        }
    }
}) satisfies GetServerSideProps<{ guides: Guide[], user: User | null }>