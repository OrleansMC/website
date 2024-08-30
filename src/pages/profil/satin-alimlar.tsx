import Button from '@/components/common/Button'
import AuthManager, { User } from '@/lib/server/auth/AuthManager'
import { PageProps } from '@/types'
import { GetServerSideProps } from 'next'
import React from 'react'
import "@/styles/blog.module.scss"
import ProfileLayout from '@/layouts/ProfileLayout'

ProfilePage.getLayout = function getLayout(page: React.ReactNode, pageProps: any) {
    return (
        <ProfileLayout user={pageProps.user}>
            {page}
        </ProfileLayout>
    )
}

export default function ProfilePage({ user }: PageProps) {
    if (!user) return null;

    return (
        <div data-aos="fade">
            <h2>TESTTT</h2>
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