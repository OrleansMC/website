import ProfileHeader from '@/components/profile/Header'
import Selector from '@/components/profile/Selector';
import Layout from '@/layouts/Layout'
import { PageProps } from '@/types'
import React from 'react'

export default function ProfileLayout({ user, children }: PageProps) {
    if (!user) return null;

    return (
        <Layout
            title="OrleansMC - Profil"
            description="OrleansMC sunucusundaki profilinizi yönetin."
            ogDescription="OrleansMC sunucusundaki profilinizi yönetin."
            user={user}
        >
            <ProfileHeader user={user} />
            <Selector user={user}>{children}</Selector>
        </Layout >
    )
}