import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Button from "./Button";
import { WebUser } from "@/lib/server/auth/AuthManager";
import UUIDManager from "@/lib/client/UUIDManager";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/navbar.module.scss";

declare namespace JSX {
    interface IntrinsicElements {
        "lottie-player": any;
    }
};

export default function Navbar(navbarProps: {
    user: WebUser | null;
}) {
    const navigators = [
        {
            name: "Ana Sayfa",
            url: "/",
            bg: "bg-blue-500"
        },
        {
            name: "Haberler",
            url: "/haberler",
            bg: "bg-blue-500"
        },
        {
            name: "Rehber",
            url: "#",
            bg: "bg-blue-500"
        },
        {
            name: "Mağaza",
            url: "#",
            bg: "bg-purple-500"
        }
    ]

    if (navbarProps.user) {
        navigators.push({
            name: "Kredi Yükle",
            url: "https://buymeacoffee.com/orleansmc/extras",
            bg: "bg-purple-500"
        });
    }

    const router = useRouter();
    const [avatar, setAvatar] = React.useState<string>("https://render.skinmc.net/3d.php?user=MustafaCan&vr=-5&hr0&hrh=25&aa=1&headOnly=true&ratio=10");

    const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

    useEffect(() => {
        (async () => {
            if (navbarProps.user) {
                const uuid = await UUIDManager.getInstance().getUUID(navbarProps.user.username);
                setAvatar(`https://render.skinmc.net/3d.php?user=${uuid}&vr=-5&hr0&hrh=25&aa=1&headOnly=true&ratio=10`);
            }
        })();
    }, []);

    const coinRef = React.createRef<HTMLTemplateElement>();

    // @ts-ignore
    const lottie = <lottie-player
        id="upgrade_crown"
        ref={coinRef}
        speed={1}
        loop={true}
        hover={false}
        mode="normal"
        src="/uploads/coins_75c0679ecf.json"
    />

    const menuButton = <button className={
        `hidden lg:block ${styles["navbar-toggle-button"]}${menuOpen ? " " + styles["active"] : ""}`
    }
        onClick={() => {
            setMenuOpen(!menuOpen);
        }}
    >
        <span></span>
        <span></span>
        <span></span>
    </button>

    return (
        <header className="flex justify-center w-full">
            <div className="glow"></div>
            <nav className="flex justify-between backdrop-blur items-center py-5 fixed z-30 container">
                <div>
                    {menuButton}
                    <div className={`flex items-center space-x-4 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 
                        lg:z-50 lg:bg-black/90 lg:rounded-lg lg:py-8 lg:px-8 lg:top-0 lg:w-full lg:h-screen
                        lg:flex-col lg:justify-start lg:items-center lg:space-y-4 lg:gap-4 navbar-mobile-menu
                        ` + `${menuOpen ? " active" : ""}`}>
                        {menuButton}
                        <ul className="flex space-x-4 font-semibold items-center lg:w-full 
                        lg:flex-col lg:space-y-4 lg:space-x-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2">
                            {navigators.map((navigator, index) => (
                                <li key={index} className="flex items-center relative">
                                    <Button
                                        type="link" href={navigator.url}
                                        className={((navigator.url == "/" && router.pathname == "/") ||
                                            (navigator.url != "/" && router.pathname.startsWith(navigator.url))
                                            ? `${navigator.bg} ` : "") + `hover:${navigator.bg} lg:!text-2xl lg:px-10 lg:py-2`}>
                                        {navigator.name}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex space-x-4">
                    {!navbarProps.user && (<>
                        <Button type="link" href="/kaydol" className="bg-purple-500 hover:bg-blue-500 hover:bg-purple-500 hover:!bg-purple-400">
                            <span>Kaydol</span>
                        </Button>
                        <Button type="link" href="/giris-yap" className="bg-green-500 hover:!bg-green-400">
                            <span>Giriş Yap</span>
                        </Button></>)}
                    {
                        navbarProps.user && (
                            <div className="flex items-center gap-2">
                                <Link href={`/profil`} className="flex items-center gap-2" onMouseEnter={
                                    () => {
                                        const lottiePlayer = coinRef.current as any;
                                        lottiePlayer?.play();
                                    }
                                } onMouseLeave={
                                    () => {
                                        const lottiePlayer = coinRef.current as any;
                                        lottiePlayer?.pause();
                                    }
                                }>
                                    <div
                                        className="flex flex-col">
                                        <div className="flex items-center justify-center font-medium leading-5">
                                            <span>{navbarProps.user.username}</span>
                                        </div>
                                        <div className="flex items-center justify-end gap-1 text-base text-zinc-300">
                                            <span>1000</span>
                                            <span
                                                className="w-6 h-6"
                                            >{lottie}</span>
                                        </div>
                                    </div>
                                    <Image
                                        className="ml-2"
                                        unoptimized
                                        src={avatar} alt="Avatar" width={56} height={56} />
                                </Link>
                                <div className="ml-2 flex items-center text-zinc-300 font-semibold hover:text-zinc-100 cursor-pointer duration-300"
                                    onClick={async () => {
                                        await fetch("/api/auth/logout", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            credentials: "include"
                                        });
                                        router.reload();
                                    }}>
                                    <span className="material-symbols-rounded !text-4xl">
                                        logout
                                    </span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </nav>
        </header>
    );
}