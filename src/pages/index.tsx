import Hero from '@/components/home/Hero'
import News from '@/components/home/News'
import Section from '@/components/home/Section'
import Layout from '@/layouts/Layout'
import { WebUser } from '@/lib/server/auth/AuthManager'
import BlogManager, { Blog } from '@/lib/server/blogs/BlogManager'
import AuthManager from '@/lib/server/auth/AuthManager'
import { PageProps } from '@/types'
import { GetServerSideProps } from 'next'
import React from 'react'

type HomeProps = {
    lastBlog: Blog
} & PageProps

export default function Home({ lastBlog, user }: HomeProps) {
    return (
        <Layout
            title="OrleansMC - Minecraft Sunucusu"
            description="OrleansMC sunucusunda ikliminizi seçin ve dünyanızı inşa edin! Vahşi dünyada yaratıklarla savaşın!"
            ogDescription="OrleansMC sunucusunda ikliminizi seçin ve dünyanızı inşa edin! Vahşi dünyada yaratıklarla savaşın!"
            user={user}
        >
            <Hero />
            <div className="flex flex-col gap-48 mb-44">
                <News lastBlog={lastBlog} />
                <Section
                    title="Discord Topluluğumuzun Bir Parçası Olun"
                    description="OrleansMC Discord sunucumuza katılarak topluluğumuzun bir parçası olabilirsiniz. 
                    Sunucumuzda en son güncellemeleri, etkinlikleri ve daha fazlasını takip edebilirsiniz. 
                    Ayrıca, diğer oyuncularla sohbet edebilir, yeni arkadaşlıklar kurabilir ve 
                    harika vakit geçirebilirsiniz!"
                    image="/uploads/guard_c78763193f.png"
                    imageAlt="Guard"
                    imageWidth={360}
                    imageHeight={360}
                    imagePosition="left"
                    discordButton
                />
                <Section
                    title="Rehberlerimiz Size Yardımcı Olabilir"
                    description="OrleansMC Minecraft sunucusunda oynamaya başlamak için rehberlerimizi okuyabilirsiniz. 
                    Bu rehberler; sunucumuzdaki oyunun temelleri, özellikler ve daha fazlası hakkında size bilgi verebilir. 
                    Rehberlerimizi inceleyerek avantaj sağlayabilir ve oyun deneyiminizi daha keyifli hale getirebilirsiniz!"
                    image="/uploads/guide_6dc241b571.png"
                    imageAlt="Book"
                    imageWidth={360}
                    imageHeight={360}
                    imagePosition="right"
                    buttonText="Rehberlere Göz At"
                    buttonUrl="/rehberler"
                />
            </div>
        </Layout>
    )
}


export const getServerSideProps = (async (ctx) => {
    return {
      props: {
        lastBlog: BlogManager.getInstance().blogs[0],
        user: await AuthManager.getInstance().getUserFromContext(ctx)
      }
    }
  }) satisfies GetServerSideProps<{ user: WebUser | null, lastBlog: Blog }>