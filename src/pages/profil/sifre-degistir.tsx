import Button from '@/components/common/Button'
import AuthManager, { User } from '@/lib/server/auth/AuthManager'
import { PageProps } from '@/types'
import { GetServerSideProps } from 'next'
import React from 'react'
import "@/styles/blog.module.scss"
import Layout from '@/layouts/Layout'
import PermsManager from '@/lib/server/database/mysql/PermsManager'
import Util from '@/lib/common/Util'
import Input from '@/components/register/Input'

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
                <h2 className='text-3xl font-semibold text-white'>Şifreni Değiştir</h2>
                <span className={
                    `text-base font-semibold text-white inline-block px-3 py-2 rounded-md`}
                    style={{ backgroundColor: Util.getRankColor(user.player.rank) }}
                >
                    Rütbeniz: {Util.getRankDisplayName(user.player.rank)}
                </span>
            </div>
            <p className='text-zinc-300 mt-2'>
                Buradan şifrenizi değiştirebilirsiniz.
            </p>
            <div>
                <form className='mt-6'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='old-password' className='text-zinc-300'>Eski Şifre</label>
                        <Input
                            type='password'
                            id='old-password'
                            className='bg-dark-750 p-2 rounded-md text-zinc-300 hover:bg-dark-650'
                            placeholder='Eski şifrenizi girin'
                        />
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <label htmlFor='new-password' className='text-zinc-300'>Yeni Şifre</label>
                        <Input
                            type='password'
                            id='new-password'
                            className='bg-dark-750 p-2 rounded-md text-zinc-300 hover:bg-dark-650'
                            placeholder='Yeni şifrenizi girin'
                        />
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <label htmlFor='new-password-again' className='text-zinc-300'>Yeni Şifre Tekrar</label>
                        <Input
                            type='password'
                            id='new-password-again'
                            className='bg-dark-750 p-2 rounded-md text-zinc-300 hover:bg-dark-650'
                            placeholder='Yeni şifrenizi tekrar girin'
                        />
                    </div>
                    <input
                        type='submit'
                        value='Şifreyi Değiştir'
                        className='mt-6 w-full p-3 bg-violet-500 text-zinc-200 rounded-lg hover:bg-violet-400 duration-300 cursor-pointer'
                    />
                </form>
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
    return {
        props: {
            user
        }
    }
}) satisfies GetServerSideProps<{ user: User | null }>