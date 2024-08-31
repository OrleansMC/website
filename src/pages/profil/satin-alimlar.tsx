import Button from '@/components/common/Button'
import AuthManager, { User } from '@/lib/server/auth/AuthManager'
import { PageProps } from '@/types'
import { GetServerSideProps } from 'next'
import React from 'react'
import "@/styles/blog.module.scss"
import Layout from '@/layouts/Layout'
import StoreHistoryManager, { StoreHistory } from '@/lib/server/logs/StoreHistoryManager'
import Util from '@/lib/common/Util'

PurchasesPage.getLayout = function getLayout(page: React.ReactNode, pageProps: any) {
    return (
        <Layout
            profile
            user={pageProps.user}
            title="OrleansMC - Profil"
            description="OrleansMC sunucusundaki profilinizi yönetin."
            ogDescription="OrleansMC sunucusundaki profilinizi yönetin."
        >
            {page}
        </Layout>
    )
}

type PurchasesPageProps = {
    user: User
    marketHistory: StoreHistory
} & PageProps

export default function PurchasesPage({ user, marketHistory }: PurchasesPageProps) {
    if (!user) return null;

    //@ts-ignore
    const lottie = <lottie-player
        id="upgrade_crown"
        speed={1}
        loop={true}
        hover={false}
        mode="normal"
        src="/uploads/coins_75c0679ecf.json"
    />

    return (
        <div data-aos="fade">
            <div className='flex items-start justify-between md:flex-col-reverse md:gap-6'>
                <h2 className='text-3xl font-semibold text-white'>Satın Alımlar</h2>
                <span className={
                    `text-base font-semibold text-white inline-block px-3 py-2 rounded-md`}
                    style={{ backgroundColor: Util.getRankColor(user.player.rank) }}
                >
                    Rütbeniz: {Util.getRankDisplayName(user.player.rank)}
                </span>
            </div>
            <p className='text-zinc-300 mt-2'>
                Buradan satın alımlarınızı görebilirsiniz.
            </p>
            <div className='mt-6'>
                <div className='blog !m-0 !p-0'>
                    {
                        marketHistory?.history.map((purchase, index) => (
                            <blockquote key={index} className='text-lg text-zinc-300 mt-6 !bg-dark-700 !text-balance'>
                                <p>
                                    <span className='font-semibold'> {
                                        new Date(purchase.date).toLocaleDateString("tr-TR").replace(/\//g, ".")
                                    } {
                                            new Date(purchase.date).toLocaleTimeString("tr-TR")
                                                .split(":").slice(0, 2).join(":")
                                        } </span> - <span>{purchase.name}
                                    </span> - <span
                                        className='font-semibold text-yellow-400'
                                    >{purchase.price}</span><span className='ml-1 inline-block w-6 h-6 top-[5px] relative'
                                    >{lottie}</span>
                                </p>
                            </blockquote>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


export const getServerSideProps = (async (ctx) => {
    const user = await AuthManager.getInstance().getUserFromContext(ctx);
    if (!user) {
        return {
            redirect: {
                destination: "/giris-yap",
                permanent: false
            }
        }
    }
    const marketHistory = await StoreHistoryManager.getInstance().getHistory(user._id);
    return {
        props: {
            user,
            marketHistory: {
                ...marketHistory, history: marketHistory?.history.reverse().map(purchase => {
                    return {
                        ...purchase,
                        date: purchase.date.toISOString()
                    }
                }) || []
            } as unknown as StoreHistory
        }
    }
}) satisfies GetServerSideProps<{ user: User | null, marketHistory: StoreHistory }>