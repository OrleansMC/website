import Button from '@/components/common/Button'
import RankCard from '@/components/store/RankCard'
import Layout from '@/layouts/Layout'
import AuthManager, { User } from '@/lib/server/auth/AuthManager'
import { PageProps } from '@/types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'

type GuidesProps = InferGetServerSidePropsType<typeof getServerSideProps> & PageProps

export default function GuidesPage({ user }: GuidesProps) {
    const router = useRouter();

    const containerRef = useRef<HTMLDivElement>(null);


    function disableScroll() {
        // Get the current page scroll position
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        // if any scroll is attempted,
        // set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
    }

    function enableScroll() {
        window.onscroll = function () { };
    }

    const handleScroll = (e: any) => {
        if (e.deltaY !== 0) {
            if (!containerRef.current) return;
            containerRef.current.scrollLeft += e.deltaY * 2.5;
        }
    };

    const privileges = [
        {
            rank: "Oyuncu",
            color: "#9CA3AF",
            groups: [
                {
                    title: "Diyar",
                    privileges: [
                        {
                            icon_id: "open_with",
                            text: "Genişlik 150x150",
                        },
                        {
                            icon_id: "swords",
                            text: "Yaratıklar Doğar",
                        },
                        {
                            icon_id: "person",
                            text: "Üye Sayısı 3"
                        }
                    ]
                },
                {
                    title: "Evler",
                    privileges: [
                        {
                            icon_id: "home",
                            text: "Ev Sayısı 1"
                        }
                    ]
                }
            ]
        },
        {
            rank: "LORD",
            color: "#F59E0B",
            groups: [
                {
                    title: "Diyar",
                    privileges: [
                        {
                            icon_id: "open_with",
                            text: "Genişlik 300x300",
                        },
                        {
                            icon_id: "swords",
                            text: "Yaratıkları Aç/Kapat",
                        },
                        {
                            icon_id: "person",
                            text: "Üye Sayısı 5"
                        }
                    ]
                },
                {
                    title: "Evler",
                    privileges: [
                        {
                            icon_id: "home",
                            text: "Ev Sayısı 2"
                        }
                    ]
                }
            ]
        },
        {
            rank: "TITAN",
            color: "#10B981",
            groups: [
                {
                    title: "Diyar",
                    privileges: [
                        {
                            icon_id: "open_with",
                            text: "Genişlik 500x500",
                        },
                        {
                            icon_id: "swords",
                            text: "Yaratıkları Aç/Kapat",
                        },
                        {
                            icon_id: "person",
                            text: "Üye Sayısı 10"
                        }
                    ]
                },
                {
                    title: "Evler",
                    privileges: [
                        {
                            icon_id: "home",
                            text: "Ev Sayısı 3"
                        }
                    ]
                }
            ]
        },
        {
            rank: "YÜCE",
            color: "#3B82F6",
            groups: [{
                title: "Diyar",
                privileges: [
                    {
                        icon_id: "open_with",
                        text: "Genişlik 500x500",
                    },
                    {
                        icon_id: "swords",
                        text: "Yaratıkları Aç/Kapat",
                    },
                    {
                        icon_id: "person",
                        text: "Üye Sayısı 15"
                    }
                ]
            },
            {
                title: "Evler",
                privileges: [
                    {
                        icon_id: "home",
                        text: "Ev Sayısı 5"
                    }
                ]
            }
            ]
        },
        {
            rank: "EFSANE",
            color: "#EF4444",
            groups: [{
                title: "Diyar",
                privileges: [
                    {
                        icon_id: "open_with",
                        text: "Genişlik 1000x1000",
                    },
                    {
                        icon_id: "swords",
                        text: "Yaratıklar Doğar",
                    },
                    {
                        icon_id: "person",
                        text: "Üye Sayısı 20"
                    }
                ]
            },
            {
                title: "Evler",
                privileges: [
                    {
                        icon_id: "home",
                        text: "Ev Sayısı 10"
                    }
                ]
            }
            ]
        }
    ]

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
                    {user &&
                        <Button blank type="link" href="/kredi-yukle" className="z-20 mt-4 bg-violet-400 hover:bg-violet-300 w-fit md:m-0 md:mt-4">Kredi Yükle</Button>
                    }
                </div>
            </div>

            <div className='mt-12 flex flex-wrap gap-8'>
                <RankCard
                    title="LORD RÜTBESİ"
                    price={2000}
                    discount={{
                        percentage: 20,
                        end_date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
                    }}
                    icon="/uploads/lord_56daa1a0e9.png"
                />
                <RankCard
                    title="TITAN RÜTBESİ"
                    price={2000}
                    discount={{
                        percentage: 20,
                        end_date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
                    }}
                    icon="/uploads/titan_d3cab575e3.png"
                />
                <RankCard
                    title="YÜCE RÜTBESİ"
                    price={2000}
                    discount={{
                        percentage: 20,
                        end_date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
                    }}
                    icon="/uploads/yuce_dc6862e76a.png"
                />
                <RankCard
                    title="EFSANE RÜTBESİ"
                    price={2000}
                    icon="/uploads/legend_a15c6c37af.png"
                />
            </div>
            <div data-aos="fade-up">
                <h2 className='text-3xl font-semibold mt-16 text-center'>
                    Özellikler
                </h2>
                <div
                    onMouseEnter={disableScroll}
                    onMouseLeave={enableScroll}
                    className='mt-8 flex gap-6 scrollbar-hide overflow-x-auto scroll-container scrollbar-hide'
                    ref={containerRef}
                    onWheel={handleScroll}
                >
                    {privileges.map((privilege, index) =>
                        <div key={index} className='flex flex-col gap-4 !min-w-[320px] lg:w-full flex-[1_0_0%] lg:min-w-52 bg-dark-850 p-6 rounded-lg'>
                            <h3 className='text-2xl font-semibold' style={{ color: privilege.color }}>
                                {privilege.rank}
                            </h3>
                            {privilege.groups.map((group, groupIndex) =>
                                <div key={index} className='flex flex-col gap-4 mt-4'>
                                    <h4 className='text-xl font-semibold'>
                                        {group.title}
                                    </h4>
                                    <div className='flex flex-col gap-4'>
                                        {group.privileges.map((privilege, index) =>
                                            <div key={index} className='flex items-center gap-2'>
                                                <span
                                                    style={
                                                        groupIndex === 0 && index === 0 ? { transform: "rotate(-45deg)" } : {}
                                                    }
                                                    className='material-symbols-rounded text-zinc-400'>
                                                    {privilege.icon_id}
                                                </span>
                                                <span className='text-lg text-zinc-200'>
                                                    {privilege.text}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {index !== 0 &&
                                <Button
                                    type="button"
                                    onClick={() => router.push("/kredi-yukle")}
                                    className="bg-blue-500 hover:bg-blue-400 w-full mt-4"
                                >
                                    Satın Al
                                </Button>
                            }
                        </div>
                    )}
                </div>
            </div>
        </Layout >
    )
}


export const getServerSideProps = (async (ctx) => {
    return {
        props: {
            user: await AuthManager.getInstance().getUserFromContext(ctx)
        }
    }
}) satisfies GetServerSideProps<{ user: User | null }>