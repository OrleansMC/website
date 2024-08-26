import GuideCard from '@/components/guides/GuideCard'
import Layout from '@/layouts/Layout'
import AuthManager, { User } from '@/lib/server/auth/AuthManager'
import GuideManager, { Guide } from '@/lib/server/guides/GuideManager'
import { PageProps } from '@/types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

type GuidesProps = InferGetServerSidePropsType<typeof getServerSideProps> & PageProps

export default function GuidesPage({ guides, user }: GuidesProps) {
    const router = useRouter();

    return (
        <Layout
            title="OrleansMC - Rehber"
            description="Minecraft sunucumuz hakkında bilgi alabileceğiniz rehber sayfası."
            ogDescription="Minecraft sunucumuz hakkında bilgi alabileceğiniz rehber sayfası."
            user={user}
        >
            <div className='mt-28'>
                <div
                    data-aos="fade-down"
                    className='bg-dark-800 p-16 md:p-12 rounded-lg shadow-lg bg-gradient-to-r from-purple-700 to-indigo-500'>
                    <h1 className='text-4xl font-semibold text-center'>OrleansMC Rehber</h1>
                    <p className='text-center text-xl mt-4'>Minecraft sunucumuz hakkında bilgi alabileceğiniz rehber sayfası.</p>
                </div>

                <div data-aos="fade-up"
                    className='mt-12 grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 md:space-y-8 gap-12'>
                    {
                        guides.map((guide, index) => (
                            <GuideCard key={index} guide={guide} />
                        ))
                    }
                </div>
            </div>
        </Layout>
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
            }),
            user: await AuthManager.getInstance().getUserFromContext(ctx)
        }
    }
}) satisfies GetServerSideProps<{ guides: Guide[], user: User | null }>