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
                                <div key={index} className="flex flex-col space-y-2 h-fit">
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
                        <div>
                            <ul className="text-zinc-400 text-base flex flex-col space-y-2 justify-between h-full">
                                <li className="hover:text-zinc-300 transition-colors leading-8">
                                    <Link href="/discord" target="_blank">
                                        <svg className="w-7 h-7 footer-icon"
                                            viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="#ffffff" fillRule="nonzero"> </path> </g> </g>
                                        </svg>
                                    </Link>
                                </li>
                                <li className="hover:text-zinc-300 transition-colors leading-8">
                                    <Link href="/instagram" target="_blank">
                                        <svg className="w-7 h-7 footer-icon"
                                            viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>instagram [#167]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-340.000000, -7439.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M289.869652,7279.12273 C288.241769,7279.19618 286.830805,7279.5942 285.691486,7280.72871 C284.548187,7281.86918 284.155147,7283.28558 284.081514,7284.89653 C284.035742,7285.90201 283.768077,7293.49818 284.544207,7295.49028 C285.067597,7296.83422 286.098457,7297.86749 287.454694,7298.39256 C288.087538,7298.63872 288.809936,7298.80547 289.869652,7298.85411 C298.730467,7299.25511 302.015089,7299.03674 303.400182,7295.49028 C303.645956,7294.859 303.815113,7294.1374 303.86188,7293.08031 C304.26686,7284.19677 303.796207,7282.27117 302.251908,7280.72871 C301.027016,7279.50685 299.5862,7278.67508 289.869652,7279.12273 M289.951245,7297.06748 C288.981083,7297.0238 288.454707,7296.86201 288.103459,7296.72603 C287.219865,7296.3826 286.556174,7295.72155 286.214876,7294.84312 C285.623823,7293.32944 285.819846,7286.14023 285.872583,7284.97693 C285.924325,7283.83745 286.155174,7282.79624 286.959165,7281.99226 C287.954203,7280.99968 289.239792,7280.51332 297.993144,7280.90837 C299.135448,7280.95998 300.179243,7281.19026 300.985224,7281.99226 C301.980262,7282.98483 302.473801,7284.28014 302.071806,7292.99991 C302.028024,7293.96767 301.865833,7294.49274 301.729513,7294.84312 C300.829003,7297.15085 298.757333,7297.47145 289.951245,7297.06748 M298.089663,7283.68956 C298.089663,7284.34665 298.623998,7284.88065 299.283709,7284.88065 C299.943419,7284.88065 300.47875,7284.34665 300.47875,7283.68956 C300.47875,7283.03248 299.943419,7282.49847 299.283709,7282.49847 C298.623998,7282.49847 298.089663,7283.03248 298.089663,7283.68956 M288.862673,7288.98792 C288.862673,7291.80286 291.150266,7294.08479 293.972194,7294.08479 C296.794123,7294.08479 299.081716,7291.80286 299.081716,7288.98792 C299.081716,7286.17298 296.794123,7283.89205 293.972194,7283.89205 C291.150266,7283.89205 288.862673,7286.17298 288.862673,7288.98792 M290.655732,7288.98792 C290.655732,7287.16159 292.140329,7285.67967 293.972194,7285.67967 C295.80406,7285.67967 297.288657,7287.16159 297.288657,7288.98792 C297.288657,7290.81525 295.80406,7292.29716 293.972194,7292.29716 C292.140329,7292.29716 290.655732,7290.81525 290.655732,7288.98792" id="instagram-[#167]"> </path> </g> </g> </g> </g></svg>

                                    </Link>
                                </li>
                                <li className="hover:text-zinc-300 transition-colors leading-8">

                                    <Link href="/x" target="_blank">
                                        <svg className="w-7 h-7 footer-icon"
                                            xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 462.799"><path fill="#fff" fillRule="nonzero" d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z" /></svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/youtube" target="_blank">
                                        <svg className="w-7 h-7 footer-icon"
                                            viewBox="0 -3 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>youtube [#168]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -7442.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M251.988432,7291.58588 L251.988432,7285.97425 C253.980638,7286.91168 255.523602,7287.8172 257.348463,7288.79353 C255.843351,7289.62824 253.980638,7290.56468 251.988432,7291.58588 M263.090998,7283.18289 C262.747343,7282.73013 262.161634,7282.37809 261.538073,7282.26141 C259.705243,7281.91336 248.270974,7281.91237 246.439141,7282.26141 C245.939097,7282.35515 245.493839,7282.58153 245.111335,7282.93357 C243.49964,7284.42947 244.004664,7292.45151 244.393145,7293.75096 C244.556505,7294.31342 244.767679,7294.71931 245.033639,7294.98558 C245.376298,7295.33761 245.845463,7295.57995 246.384355,7295.68865 C247.893451,7296.0008 255.668037,7296.17532 261.506198,7295.73552 C262.044094,7295.64178 262.520231,7295.39147 262.895762,7295.02447 C264.385932,7293.53455 264.28433,7285.06174 263.090998,7283.18289" id="youtube-[#168]"> </path> </g> </g> </g> </g></svg>
                                    </Link>
                                </li>
                            </ul>
                        </div>
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