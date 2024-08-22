import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";

export default function Navbar() {
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
    const router = useRouter();
    return (
        <header className="flex justify-center w-full">
            <div className="glow"></div>
            <nav className="flex justify-between backdrop-blur items-center py-5 fixed z-50 container">
                <div>
                    <ul className="flex space-x-4 font-semibold items-center">
                        {navigators.map((navigator, index) => (
                            <li key={index} className="flex items-center relative">
                                <Button
                                    type="link" href={navigator.url}
                                    className={(router.pathname === navigator.url ? `${navigator.bg} ` : "") + `hover:${navigator.bg}`}>
                                    {navigator.name}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex space-x-4">
                    <Button type="link" href="/kaydol" className="bg-purple-500 hover:bg-blue-500 hover:bg-purple-500 hover:!bg-purple-400">
                        <span>Kaydol</span>
                    </Button>
                    <Button type="link" href="/giris-yap" className="bg-green-500 hover:!bg-green-400">
                        <span>Giriş Yap</span>
                    </Button>
                </div>
            </nav>
        </header>
    );
}