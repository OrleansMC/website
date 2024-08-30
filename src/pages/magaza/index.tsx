import Button from '@/components/common/Button'
import PopUp from '@/components/common/PopUp'
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

type StoreProps = InferGetServerSidePropsType<typeof getServerSideProps> & PageProps


StorePage.getLayout = function getLayout(page: React.ReactNode, pageProps: StoreProps) {
    return (
        <Layout
            title="OrleansMC - Mağaza"
            description="Ayrıcalıklarımızı keşfedin, kredi yükleyin ve mağazamızdan alışveriş yapın!"
            ogDescription="Ayrıcalıklarımızı keşfedin, kredi yükleyin ve mağazamızdan alışveriş yapın!"
            user={pageProps.user}
        >
            {page}
        </Layout>
    )
}

export default function StorePage({ user }: StoreProps) {
    const router = useRouter();
    const [showPopup, setShowPopup] = React.useState(false);

    return (
        <>
            <div className='mt-28' data-aos="fade-down">
                <div
                    className='flex flex-col relative py-16 px-12 md:p-12 rounded-lg shadow-lg 
                    bg-[url("/uploads/castle_entrance_3ef073eff4.png")] bg-cover bg-center bg-no-repeat 
                    before:absolute before:top-0 before:left-0 before:w-full before:h-full 
                    before:bg-gradient-to-r before:from-indigo-800/70 before:via-indigo-800/60 before:to-purple-800/10 
                    before:rounded-lg 
                    before:z-10 md:items-center md:before:to-purple-800/80 md:before:via-violet-800/80 md:before:backdrop-blur-sm'>
                    <h1 className='text-4xl md:text-center font-semibold z-20'>OrleansMC Mağaza</h1>
                    <p className='text-xl md:text-center mt-4 z-20'>Avantajlarımızı keşfedin, kredi yükleyin ve mağazamızdan alışveriş yapın!</p>
                    {user &&
                        <Button blank type="link" href="/kredi-yukle" className="z-20 mt-4 bg-violet-400 hover:bg-violet-300 w-fit md:m-0 md:mt-4">Kredi Yükle</Button>
                    }
                </div>
            </div>
            <div className='mt-12 flex flex-wrap gap-8'>
                <CategoryCard
                    title="Rütbeler"
                    href='/magaza/rutbeler'
                    description="Sunucumuzda bulunan rütbeleri inceleyin ve avantajları keşfedin."
                    icon="/uploads/legend_a15c6c37af.png"
                    button_text='Rütbeleri İncele'
                />
                <PopUp
                    show={showPopup}
                    title="KASALAR"
                    footer={
                        <Button
                            type="button"
                            onClick={() => {
                                setShowPopup(false);
                            }}
                            className="bg-blue-500 hover:bg-blue-400 w-fit"
                        >
                            Tamam
                        </Button>
                    }
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 p-4">
                            <p className="text-lg text-zinc-200 max-w-[28rem] text-center">
                                Kasaları oyun içerisinde inceleyebilir ve <br />/kredi-market menüsünden satın alabilirsiniz.
                            </p>
                        </div>
                    </div>
                </PopUp>
                <CategoryCard
                    title="Kasalar"
                    setShowPopup={setShowPopup}
                    href='/magaza'
                    description="Sunucumuzda bulunan kasaları inceleyin ve içeriklerini keşfedin."
                    icon="/uploads/chest_99cad35421.png"
                    button_text='Kasaları İncele'
                />
            </div>
        </>
    )
}


export const getServerSideProps = (async (ctx) => {
    return {
        props: {
            user: await AuthManager.getInstance().getUserFromContext(ctx)
        }
    }
}) satisfies GetServerSideProps<{ user: User | null }>