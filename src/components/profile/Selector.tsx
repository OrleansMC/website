import { PageProps } from '@/types'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

export default function Selector({ user, children }: PageProps) {
    if (!user) return null;

    const router = useRouter();
    const navigation = [
        {
            title: 'Profil',
            href: '/profil',
        },
        {
            title: 'Satın Alımlar',
            href: '/profil/satin-alimlar',
        },
        {
            title: 'Şifre Değiştir',
            href: '/profil/sifre-degistir',
        },
    ];

    return (
        <div className='flex gap-4 w-full mt-8' data-aos='fade-up' data-aos-delay="500">
            <div className='bg-dark-950 p-6 rounded-lg' style={{ width: '520px' }}>
                <h3 className='text-2xl font-semibold text-white mb-4'>Menü</h3>
                <ul className='space-y-3 w-full'>
                    {
                        navigation.map((nav) => (
                            <li className={
                                `text-zinc-100 font-normal text-lg ` +
                                `p-3 rounded-md duration-300 cursor-pointer w-full inline-block`
                                + (router.pathname === nav.href ? ' bg-violet-500' : ' hover:bg-violet-500')
                            }
                                onClick={() => router.push(nav.href, undefined, {
                                    shallow: false,
                                    scroll: false,
                                })}>
                                {nav.title}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='bg-dark-950 p-6 rounded-lg w-full'>
                {children}
            </div>
        </div>
    )
}