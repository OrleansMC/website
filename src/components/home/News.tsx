import Image from "next/image";
import React from "react";
import Button from "../common/Button";
import Link from "next/link";

export default function News() {
    return (
        <section className="flex flex-col justify-center items-center space-y-8" data-aos="fade-up" data-offset="100">
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl font-semibold mb-3"
                >OrleansMC Haberler</h2>
                <p className="text-lg text-center text-zinc-400"
                >OrleansMC sunucusu ile ilgili haberler ve güncellemeler</p>
            </div>
            <div>
                <Link
                    className="flex flex-row space-x-8 hover:shadow-lg p-8 rounded-lg bg-zinc-900/70 hover:bg-zinc-900/75 transition-transform"
                    href={`/haberler/1`}>
                    <div className="relative rounded-lg overflow-hidden flex-[1_0_0%]">
                        <Image className="" src="/uploads/fire_c244b1f02a.png" alt="Haber 1" width={245 * 3} height={53 * 3} />
                    </div>
                    <div className="flex-[1_0_0%]">
                        <h3 className="text-2xl font-semibold mb-3">1.0.0 - İlk Ateş 🔥</h3>
                        <span className="text-zinc-500 text-lg">
                            <span className="text-yellow-400 font-semibold">
                                Güncelleme
                            </span>
                            <span className="mx-2">
                                -
                            </span>
                            <span>
                                Ağustos 15, 2024
                            </span>
                        </span>
                        <p className="text-lg text-zinc-400 mt-6 leading-9 text-pretty">
                            OrleansMC, Minecraft dünyasının en heyecanlı ve özgün deneyimlerinden birini sunmak için burada! Yeni oyun modumuz "Diyarlar" ile karşınızdayız. Her oyuncu, başlangıçta kendine özel bir iklim seçme şansı bulacak. İster tropikal, ister soğuk ve karlı, isterse de kuru ve sıcak bir bölge; her iklim, kendine özgü kaynaklar, zorluklar ve güzelliklerle dolu olacak.
                        </p>
                    </div>
                </Link>
            </div>
            <div>
                <Button type="link" href="/haberler" className="bg-purple-500 hover:bg-purple-400 py-3">
                    Tüm Haberleri Gör
                </Button>
            </div>
        </section>
    )
}