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
                    url: "#"
                },
                {
                    name: "Rehber",
                    url: "#"
                },
                {
                    name: "Mağaza",
                    url: "#"
                }
            ]
        },
        {
            name: "Hakkımızda",
            links: [
                {
                    name: "Hakkımızda",
                    url: "#"
                },
                {
                    name: "Kurallar",
                    url: "#"
                },
                {
                    name: "Kullanım Şartları",
                    url: "#"
                },
                {
                    name: "Gizlilik Politikası",
                    url: "#"
                }
            ]
        },
        {
            name: "İletişim",
            links: [
                {
                    name: "Destek",
                    url: "#"
                },
                {
                    name: "İletişim",
                    url: "#"
                },
                {
                    name: "Sponsorluk",
                    url: "#"
                }
            ]
        }
    ]
    return (
        <footer className="container mb-8 mt-52">
            <div className="rounded-tl-lg rounded-tr-lg bg-zinc-900/70 px-12 py-9">
                <div className="flex gap-10 lg:flex-wrap items-center justify-between md:flex-col">
                    <div className="flex flex-col items-center space-y-2">
                        <Image src="/uploads/logo_903c38fe13.png" alt="OrleansMC" width={245} height={53} quality={100} />
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

            <div className="rounded-bl-lg rounded-br-lg bg-zinc-800/60 px-12 py-3">
                <div className="flex items-center justify-between md:flex-col md:space-y-1">
                    <p className="text-zinc-400 text-base">
                        © 2024 OrleansMC. Tüm hakları saklıdır.
                    </p>
                    <p className="text-zinc-400 text-base">
                        Mustafa Can tarafından geliştirildi.
                    </p>
                </div>
            </div>
        </footer>
    )
}