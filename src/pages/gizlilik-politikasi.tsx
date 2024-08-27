import AuthManager, { User } from "@/lib/server/auth/AuthManager";
import { PageProps } from "@/types";
import React from "react";
import { GetServerSideProps } from "next";
import Layout from "@/layouts/Layout";
import styles from "@/styles/blog.module.scss";

export default function PrivacyPolicy(props: PageProps) {
    return (
        <Layout
            title="OrleansMC - Gizlilik Politikası"
            description="OrleansMC Gizlilik Politikası"
            ogDescription="OrleansMC Gizlilik Politikası"
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
                    <h1 className='text-4xl font-semibold text-center z-20'>OrleansMC Gizlilik Politikası</h1>
                    <p className='text-center text-xl mt-4 z-20'>OrleansMC Gizlilik Politikası</p>
                </div>
            </div>
            <div className={styles.blog} data-aos="fade-up">
                <h2 className="!mb-6">Son güncellenme: 27/08/2024</h2>

                <p>
                    Güvenliğiniz bizim için önemli. Bu sebeple bizimle paylaşacağınız kişisel verileriz hassasiyetle korunmaktadır.
                </p>
                <p>
                    Biz, OrleansMC, veri sorumlusu olarak, bu gizlilik ve kişisel verilerin korunması politikası ile,
                    hangi kişisel verilerinizin hangi amaçla işleneceği, işlenen verilerin kimlerle ve neden paylaşılabileceği,
                    veri işleme yöntemimiz ve hukuki sebeplerimiz ile; işlenen verilerinize ilişkin haklarınızın neler
                    olduğu hususunda sizleri aydınlatmayı amaçlıyoruz.
                </p>
                <h2>Toplanan Kişisel Verileriniz, Toplanma Yöntemi ve Hukuki Sebebi</h2>
                <p>
                    Kimlik, (isim, soy isim, doğum tarihi gibi) iletişim, (adres, e-posta adresi, telefon, IP, konum gibi)
                    özlük, sosyal medya, finans bilgileriniz ile görsel ve işitsel kayıtlarınız tarafımızca,
                    çerezler (cookies) vb. teknolojiler vasıtasıyla, otomatik veya otomatik olmayan yöntemlerle
                    ve bazen de analitik sağlayıcılar, reklam ağları, arama bilgi sağlayıcıları,
                    teknoloji sağlayıcıları gibi üçüncü taraflardan elde edilerek, kaydedilerek,
                    depolanarak ve güncellenerek, aramızdaki hizmet ve sözleşme ilişkisi çerçevesinde
                    ve süresince, meşru menfaat işleme şartına dayanılarak işlenecektir.
                </p>
                <h2>Kişisel Verilerinizin İşlenme Amacı</h2>
                <p>
                    Bizimle paylaştığınız kişisel verileriniz; hizmetlerimizden faydalanabilmeniz
                    amacıyla sizlerle sözleşmeler kurabilmek, sunduğumuz hizmetlerin gerekliliklerini
                    en iyi şekilde ve aramızdaki sözleşmelere uygun olarak yerine getirebilmek,
                    bu sözleşmelerden doğan haklarınızın tarafınızca kullanılmasını sağlayabilmek,
                    ürün ve hizmetlerimizi, ihtiyaçlarınız doğrultusunda geliştirebilmek ve bu
                    gelişmelerden sizleri haberdar edebilmek, ayrıca sizleri daha geniş kapsamlı hizmet
                    sağlayıcıları ile yasal çerçeveler içerisinde buluşturabilmek ve kanundan doğan
                    zorunlulukların (kişisel verilerin talep halinde adli ve idari makamlarla paylaşılması)
                    yerine getirilebilmesi amacıyla, sözleşme ve hizmet süresince, amacına uygun ve ölçülü bir
                    şekilde işlenecek ve güncellenecektir.
                </p>
                <h2>Toplanan Kişisel Verilerin Kimlere ve Hangi Amaçlarla Aktarılabileceği</h2>
                <p>
                    Bizimle paylaştığınız kişisel verileriniz; faaliyetlerimizi yürütmek üzere hizmet
                    aldığımız ve/veya verdiğimiz, sözleşmesel ilişki içerisinde bulunduğumuz,
                    iş birliği yaptığımız, yurt içi ve yurt dışındaki 3. şahıslar ile kurum ve
                    kuruluşlara ve talep halinde adli ve idari makamlara, gerekli teknik ve idari
                    önlemler alınması koşulu ile aktarılabilecektir.
                </p>
                <h2>Kişisel Verileri İşlenen Kişi Olarak Haklarınız</h2>
                <p>KVKK madde 11 uyarınca herkes, veri sorumlusuna başvurarak aşağıdaki haklarını kullanabilir:</p>
                <ol type="a">
                    <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
                    <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
                    <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                    <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
                    <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
                    <li>Kişisel verilerin silinmesini veya yok edilmesini isteme,</li>
                    <li>(e) ve (f) bentleri uyarınca yapılan işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
                    <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,</li>
                    <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme, haklarına sahiptir.</li>
                </ol>
                <p>Yukarıda sayılan haklarınızı kullanmak üzere iletisim@orleansmc.com üzerinden bizimle iletişime geçebilirsiniz.</p>
                <h2>İletişim</h2>
                <p>
                    Sizlere talepleriniz doğrultusunda hizmet sunabilmek amacıyla, sadece gerekli olan kişisel verilerinizin,
                    işbu gizlilik ve kişisel verilerin işlenmesi politikası uyarınca işlenmesini,
                    kabul edip etmemek hususunda tamamen özgürsünüz. Siteyi kullanmaya devam ettiğiniz
                    takdirde kabul etmiş olduğunuz tarafımızca varsayılacak olup, daha ayrıntılı bilgi
                    için bizimle iletisim@orleansmc.com e-mail adresi üzerinden iletişime geçmekten lütfen çekinmeyiniz.
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