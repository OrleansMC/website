import Hero from '@/components/home/Hero'
import News from '@/components/home/News'
import Section from '@/components/home/Section'
import Layout from '@/layouts/Layout'
import React from 'react'

export default function Home() {
    return (
        <Layout>
            <Hero />
            <div className="flex flex-col gap-48">
                <News />
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
                    blurhash='T89HhQ?wI8%hIAofQkH=cFR4MwpJ'
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
                    blurhash='TKCaFuS~wP*GypOW0guLXj9]KI-p'
                    buttonText="Rehberlere Göz At"
                    buttonUrl="/rehberler"
                />
            </div>
        </Layout>
    )
}