import Button from '@/components/common/Button'
import AuthManager, { User } from '@/lib/server/auth/AuthManager'
import { PageProps } from '@/types'
import { GetServerSideProps } from 'next'
import React from 'react'
import "@/styles/blog.module.scss"
import Layout from '@/layouts/Layout'
import PermsManager from '@/lib/server/database/mysql/PermsManager'

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

export default function ProfilePage({ user, primaryGroup }: PageProps & { primaryGroup: string | null }) {
    if (!user) return null;

    let groupDisplayName;

    switch (primaryGroup) {
        case "legend":
            groupDisplayName = "Efsane";
            break;
        case "yuce":
            groupDisplayName = "Yüce";
            break;
        case "titan":
            groupDisplayName = "Titan";
            break;
        case "legend":
            groupDisplayName = "Efsane";
            break;
        default:
            groupDisplayName = "Oyuncu";
            break;
    }

    let rankColor;
    switch (primaryGroup) {
        case "legend":
            rankColor = "#8A6ADA";
            break;
        case "yuce":
            rankColor = "#da7fdb";
            break;
        case "titan":
            rankColor = "#d4a935";
            break;
        case "lord":
            rankColor = "#4A69D9";
            break;
        default:
            rankColor = "#949aa6";
            break;
    }

    return (
        <div data-aos="fade">
            <div className='flex items-start justify-between'>
                <h2 className='text-3xl font-semibold text-white'>Profil</h2>
                <span className={
                    `text-base font-semibold text-white inline-block px-3 py-2 rounded-md`}
                    style={{ backgroundColor: rankColor }}
                >
                    Rütbeniz: {groupDisplayName}
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
            user,
            primaryGroup: PermsManager.getInstance().getPlayerPrimaryGroupByUUID(user.player.uuid)
        }
    }
}) satisfies GetServerSideProps<{ user: User | null, primaryGroup: string | null }>