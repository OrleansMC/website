import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
    const navigators = [
        {
            name: "Sayfalar",
            links: [
                {
                    name: "Ana Sayfa",
                    url: "/"
                },
                {
                    name: "Haberler",
                    url: "/haberler"
                },
                {
                    name: "Rehber",
                    url: "/rehber"
                },
                {
                    name: "Mağaza",
                    url: "/magaza"
                }
            ]
        },
        {
            name: "Hakkımızda",
            links: [
                {
                    name: "Neden Biz?",
                    url: "/rehber/neden-biz"
                },
                {
                    name: "Kurallar",
                    url: "/rehber/kurallar"
                },
                {
                    name: "Kullanım Şartları",
                    url: "/kullanim-sartlari"
                },
                {
                    name: "Gizlilik Politikası",
                    url: "/gizlilik-politikasi"
                }
            ]
        },
        {
            name: "İletişim",
            links: [
                {
                    name: "Destek",
                    url: "/destek"
                },
                {
                    name: "İletişim",
                    url: "/discord"
                },
                {
                    name: "Sponsorluk",
                    url: "mailto:iletisim@orleansmc.com"
                }
            ]
        }
    ]
    return (
        <footer className="container mb-8 mt-16">
            <div className="rounded-tl-lg rounded-tr-lg bg-dark-950 px-12 py-9 md:py-6 md:px-6">
                <div className="flex gap-10 lg:flex-wrap items-center justify-between md:flex-col">
                    <div className="flex flex-col items-center space-y-2">
                        <Image
                            src="/uploads/logo_ae2b79e367.png"
                            alt="OrleansMC Logo"
                            width={245}
                            placeholder="blur"
                            blurDataURL="/uploads/thumbnail_logo_ae2b79e367.png"
                            height={53}
                            quality={100} />
                        <p className="text-zinc-400 text-center text-xs max-w-[17rem]">
                            We are in no way affiliated with or endorsed by Mojang, AB.
                        </p>
                    </div>
                    <div className="flex gap-20 md:flex-wrap md:gap-10">
                        {
                            navigators.map((navigator, index) => (
                                <div key={index} className="flex flex-col space-y-2">
                                    <h4 className="text-xl font-semibold">{navigator.name}</h4>
                                    <ul className="text-zinc-400 text-base">
                                        {navigator.links.map((link, index) => (
                                            <li key={index} className="hover:text-zinc-300 transition-colors leading-8">
                                                <Link href={link.url}>
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="rounded-bl-lg rounded-br-lg bg-dark-800 px-12 py-3 md:px-6">
                <div className="flex items-center justify-between md:flex-col md:space-y-1">
                    <p className="text-zinc-400 text-base md:text-center">
                        © 2024 OrleansMC. Tüm hakları saklıdır.
                    </p>
                    <p className="text-zinc-400 text-base md:text-center">
                        Mustafa Can tarafından geliştirildi.
                    </p>
                </div>
            </div>
        </footer>
    )
}