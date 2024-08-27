import Button from '@/components/common/Button'
import GuideCard from '@/components/guides/GuideCard'
import CategoryCard from '@/components/store/CategoryCard'
import Layout from '@/layouts/Layout'
import AuthManager, { User } from '@/lib/server/auth/AuthManager'
import GuideManager, { Guide } from '@/lib/server/guides/GuideManager'
import { PageProps } from '@/types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

type GuidesProps = InferGetServerSidePropsType<typeof getServerSideProps> & PageProps

export default function GuidesPage({ user }: GuidesProps) {
    const router = useRouter();

    return (
        <Layout
            title="OrleansMC - Rütbeler"
            description='Sunucumuzda bulunan rütbeleri inceleyin ve avantajları keşfedin.'
            ogDescription="Sunucumuzda bulunan rütbeleri inceleyin ve avantajları keşfedin."
            user={user}
        >
            <div className='mt-28' data-aos="fade-down">
                <div
                    className='flex flex-col relative py-16 px-12 md:p-12 rounded-lg shadow-lg 
                    bg-[url("/uploads/castle_entrance_3ef073eff4.png")] bg-cover bg-center bg-no-repeat 
                    before:absolute before:top-0 before:left-0 before:w-full before:h-full 
                    before:bg-gradient-to-r before:from-indigo-800/70 before:via-indigo-800/60 before:to-purple-800/10 
                    before:rounded-lg 
                    before:z-10 md:items-center md:before:to-purple-800/80 md:before:via-violet-800/80 md:before:backdrop-blur-sm'>
                    <h1 className='text-4xl md:text-center font-semibold z-20'>
                        OrleansMC Rütbeler
                    </h1>
                    <p className='text-xl md:text-center mt-4 z-20'>
                        Sunucumuzda bulunan rütbeleri inceleyin ve avantajları keşfedin.
                    </p>
                    <Button blank type="link" href="/kredi-yukle" className="z-20 mt-4 bg-violet-400 hover:bg-violet-300 w-fit md:m-0 md:mt-4">Kredi Yükle</Button>
                </div>
            </div>

            
        </Layout>
    )
}


export const getServerSideProps = (async (ctx) => {
    return {
        props: {
            user: await AuthManager.getInstance().getUserFromContext(ctx)
        }
    }
}) satisfies GetServerSideProps<{ user: User | null }>