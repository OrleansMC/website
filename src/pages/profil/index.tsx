import Button from '@/components/common/Button'
import AuthManager, { User } from '@/lib/server/auth/AuthManager'
import { PageProps } from '@/types'
import { GetServerSideProps } from 'next'
import React from 'react'
import "@/styles/blog.module.scss"
import Layout from '@/layouts/Layout'
import Util from '@/lib/common/Util'

ProfilePage.getLayout = function getLayout(page: React.ReactNode, pageProps: any) {
    return (
        <Layout profile
            user={pageProps.user}
            title="OrleansMC - Profil"
            description="OrleansMC sunucusundaki profilinizi yönetin."
            ogDescription="OrleansMC sunucusundaki profilinizi yönetin."
        >
            {page}
        </Layout>
    )
}

export default function ProfilePage({ user }: PageProps) {
    if (!user) return null;

    return (
        <div data-aos="fade">
            <div className='flex items-start justify-between'>
                <h2 className='text-3xl font-semibold text-white'>Profil</h2>
                <span className={
                    `text-base font-semibold text-white inline-block px-3 py-2 rounded-md`}
                    style={{ backgroundColor: Util.getRankColor(user.player.rank) }}
                >
                    Rütbeniz: {Util.getRankDisplayName(user.player.rank)}
                </span>
            </div>
            <p className='text-zinc-300 mt-2'>
                {user.username}, Seni Aramızda Görmek Ne Güzel!
            </p>
            <div className='blog !m-0 !p-0'>
                <blockquote className='text-lg text-zinc-300 mt-6 !bg-dark-700 !text-balance'>
                    <p>
                        OrleansMC'de oynadığın için teşekkür ederiz!
                        Buradan profilini yönetebilirsin.
                        Eğer kafana takılan bir şey olursa destek almak için bize ulaşmaktan çekinme!
                    </p>
                </blockquote>
            </div>
            <Button
                type='link'
                blank
                href='/destek'
                className='mt-6 bg-blue-500 hover:bg-blue-400 w-fit !text-base'
            >
                Destek Al
            </Button>
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
    return {
        props: {
            user
        }
    }
}) satisfies GetServerSideProps<{ user: User | null }>