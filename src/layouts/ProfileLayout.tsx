import ProfileHeader from '@/components/profile/Header'
import Selector from '@/components/profile/Selector';
import Layout from '@/layouts/Layout'
import { PageProps } from '@/types'
import React from 'react'

export default function ProfileLayout({ user, children }: PageProps) {
    if (!user) return null;

    return (
        <>
            <ProfileHeader user={user} />
            <Selector user={user}>{children}</Selector>
        </>
    )
}