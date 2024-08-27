import AuthManager, { User } from "@/lib/server/auth/AuthManager";
import { PageProps } from "@/types";
import React from "react";
import { GetServerSideProps } from "next";
import Layout from "@/layouts/Layout";
import styles from "@/styles/blog.module.scss";

export default function UserAgament(props: PageProps) {
    return (
        <Layout
            title="OrleansMC - Kullanım Şartları"
            description="OrleansMC kullanım şartları sayfası."
            ogDescription="OrleansMC kullanım şartları sayfası."
            user={props.user}
        >
            <div className='mt-28'>
                <div
                    data-aos="fade-down"
                    className='flex flex-col relative p-16 md:p-12 rounded-lg shadow-lg 
                    bg-[url("/uploads/sun_risepng_b3c86a759f.png")] bg-cover bg-center bg-no-repeat 
                    before:absolute before:top-0 before:left-0 before:w-full before:h-full 
                    before:bg-gradient-to-r before:from-purple-900/80 before:to-indigo-800/80 
                    before:z-10'>
                    <h1 className='text-4xl font-semibold text-center z-20'>
                        OrleansMC Kullanım Şartları
                    </h1>
                    <p className='text-center text-xl mt-4 z-20'>
                        OrleansMC kullanım şartları sayfası.
                    </p>
                </div>
            </div>
            <div className={styles.blog} data-aos="fade-up">
                <h2 className="!mb-6">Son güncellenme: 27/08/2024</h2>
                <p>
                    Sevgili ziyaretçimiz, lütfen https://orleansmc.com web sitemizi ziyaret etmeden önce işbu
                    kullanım koşulları sözleşmesini dikkatlice okuyunuz. Siteye erişiminiz
                    tamamen bu sözleşmeyi kabulünüze ve bu sözleşme ile belirlenen
                    şartlara uymanıza bağlıdır. Şayet bu sözleşmede yazan herhangi
                    bir koşulu kabul etmiyorsanız, lütfen siteye erişiminizi sonlandırınız.
                    Siteye erişiminizi sürdürdüğünüz takdirde, koşulsuz ve kısıtlamasız olarak,
                    işbu sözleşme metninin tamamını kabul ettiğinizin, tarafımızca varsayılacağını
                    lütfen unutmayınız.
                </p>
                <p>
                    https://orleansmc.com web sitesi OrleansMC tarafından yönetilmekte olup, bundan sonra SİTE olarak anılacaktır.
                    İşbu siteye ilişkin Kullanım Koşulları, yayınlanmakla yürürlüğe girer.
                    Değişiklik yapma hakkı, tek taraflı olarak SİTE'ye aittir ve
                    SİTE üzerinden güncel olarak paylaşılacak olan bu değişiklikleri,
                    tüm kullanıcılarımız baştan kabul etmiş sayılır.
                </p>
                <h2>Gizlilik</h2>
                <p>
                    Gizlilik, ayrı bir sayfada, kişisel verilerinizin tarafımızca
                    işlenmesinin esaslarını düzenlemek üzere mevcuttur. SİTE'yi kullandığınız takdirde,
                    bu verilerin işlenmesinin gizlilik politikasına uygun olarak gerçekleştiğini
                    kabul edersiniz.
                </p>
                <h2>Hizmet Kapsamı</h2>
                <p>
                    OrleansMC olarak, sunacağımız hizmetlerin kapsamını ve niteliğini, yasalar
                    çerçevesinde belirlemekte tamamen serbest olup; hizmetlere ilişkin yapacağımız
                    değişiklikler, SİTE'de yayınlanmakla yürürlüğe girmiş sayılacaktır.
                </p>
                <h2>Telif Hakları</h2>
                <p>
                    SİTE'de yayınlanan tüm metin, kod, grafikler,
                    logolar, resimler, ses dosyaları ve kullanılan yazılımın sahibi
                    (bundan böyle ve daha sonra "içerik" olarak anılacaktır) OrleansMC olup,
                    tüm hakları saklıdır. Yazılı izin olmaksızın site içeriğinin çoğaltılması veya kopyalanması
                    kesinlikle yasaktır.
                </p>
                <h2>Genel Hükümler</h2>
                <ul>
                    <li>
                        Kullanıcıların tamamı, SİTE'yi yalnızca hukuka uygun ve şahsi
                        amaçlarla kullanacaklarını ve üçüncü kişinin haklarına tecavüz
                        teşkil edecek nitelikteki herhangi bir faaliyette bulunmayacağını
                        taahhüt eder. SİTE dâhilinde yaptıkları işlem ve eylemlerindeki,
                        hukuki ve cezai sorumlulukları kendilerine aittir. İşbu iş ve
                        eylemler sebebiyle, üçüncü kişilerin uğradıkları veya uğrayabilecekleri
                        zararlardan dolayı SİTE'nin doğrudan ve/veya dolaylı hiçbir sorumluluğu yoktur.
                    </li>
                    <li>
                        SİTE'de mevcut bilgilerin doğruluk ve güncelliğini sağlamak için
                        elimizden geleni yapmaktayız. Lakin gösterdiğimiz çabaya rağmen,
                        bu bilgiler, fiili değişikliklerin gerisinde kalabilir, birtakım
                        farklılıklar olabilir. Bu sebeple, site içerisinde yer alan bilgilerin
                        doğruluğu ve güncelliği ile ilgili tarafımızca, açık veya zımni, herhangi
                        bir garanti verilmemekte, hiçbir taahhütte bulunulmamaktadır.
                    </li>
                    <li>
                        SİTE'de üçüncü şahıslar tarafından işletilen ve içerikleri tarafımızca
                        bilinmeyen diğer web sitelerine, uygulamalara ve platformlara köprüler
                        (hyperlink) bulunabilir. SİTE, işlevsellik yalnızca bu sitelere ulaşımı
                        sağlamakta olup, içerikleri ile ilgili hiçbir sorumluluk kabul etmemekteyiz.
                    </li>
                    <li>
                        SİTE'yi virüslerden temizlenmiş tutmak konusunda elimizden geleni
                        yapsak da, virüslerin tamamen bulunmadığı garantisini vermemekteyiz.
                        Bu nedenle veri indirirken, virüslere karşı gerekli önlemi almak, kullanıcıların
                        sorumluluğundadır. Virüs vb. kötü amaçlı programlar, kodlar veya materyallerin
                        sebep olabileceği zararlardan dolayı sorumluluk kabul etmemekteyiz.
                    </li>
                    <li>
                        SİTE'de sunulan hizmetlerde, kusur veya hata olmayacağına ya da
                        kesintisiz hizmet verileceğine dair garanti vermemekteyiz. SİTE'ye ve
                        sitenin hizmetlerine veya herhangi bir bölümüne olan erişiminizi önceden
                        bildirmeksizin herhangi bir zamanda sonlandırabiliriz.
                    </li>
                </ul>
                <h2>Sorumluluğun Sınırlandırılması</h2>
                <p>
                    SİTE'nin kullanımından doğan zararlara ilişkin sorumluluğumuz, kast ve ağır ihmal ile sınırlıdır.
                    Sözleşmenin ihlalinden doğan zararlarda, talep edilebilecek toplam tazminat,
                    öngörülebilir hasarlar ile sınırlıdır. Yukarıda bahsedilen sorumluluk sınırlamaları
                    aynı zamanda insan hayatına, bedeni yaralanmaya veya bir kişinin sağlığına gelebilecek
                    zararlar durumunda geçerli değildir. Hukuken mücbir sebep sayılan tüm durumlarda,
                    gecikme, ifa etmeme veya temerrütten dolayı, herhangi bir tazminat yükümlülüğümüz
                    doğmayacaktır.
                </p>
                <p>
                    Uyuşmazlık Çözümü: İşbu Sözleşme'nin uygulanmasından veya yorumlanmasından
                    doğacak her türlü uyuşmazlığın çözümünde, Türkiye Cumhuriyeti yasaları uygulanır;
                    Diyarbakır Adliyesi Mahkemeleri ve İcra Daireleri yetkilidir.
                </p>
            </div>
        </Layout>
    )
}


export const getServerSideProps = (async (ctx) => {
    return {
        props: {
            user: await AuthManager.getInstance().getUserFromContext(ctx)
        }
    }
}) satisfies GetServerSideProps<{ user: User | null }>