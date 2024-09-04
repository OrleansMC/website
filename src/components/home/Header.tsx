import Image from "next/image";
import React from "react";
import Button from "../common/Button";
import PopUp from "../common/PopUp";

export default function Hero() {
    const [popUp, setPopUp] = React.useState<boolean>(false);
    const [playerCount, setPlayerCount] = React.useState<number>(0);
    const [online, setOnline] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async () => {
            const res = await fetch("/api/server");
            const data = await res.json();
            setPlayerCount(data.player_count);
            setOnline(data.online);
        })();
    }, []);

    return (
        <>
            <PopUp show={popUp} onClose={() => {
                setPopUp(false);
            }}
                footer={
                    <Button type="button" onClick={() => {
                        setPopUp(false);
                    }} className="bg-green-500/85 hover:bg-green-500">
                        Tamam
                    </Button>
                }

                title="IP Adresi Kopyalandı!"
            >
                <div className="flex justify-center items-center flex-col">
                    <p className="text-lg text-center w-3/4 pb-4 text-zinc-400">
                        Sunucumuza dilediğiniz launcher üzerinden 1.20.6 sürümüyle giriş yapabilirsiniz.
                    </p>
                    <Image
                        src="/uploads/orleansip_0a181de93f.gif"
                        alt="OrleansMC IP"
                        width={500}
                        height={500}
                    />
                </div>
            </PopUp>
            <header data-aos="fade-down" data-offset="100">
                <div className="flex flex-col justify-center items-center h-[47rem]">
                    <Image className=""
                        src="/uploads/logo_ae2b79e367.png" alt="Logo"
                        quality={100}
                        placeholder="blur"
                        blurDataURL={"/uploads/thumbnail_logo_ae2b79e367.png"}
                        width={245 * 2.6}
                        height={53 * 2.6}
                    />
                    <Button type="button" onClick={() => {
                        navigator.clipboard.writeText("Oyna.OrleansMC.Com");
                        setPopUp(true);
                    }}
                        className="bg-gray-500/85 hover:bg-gray-500 mt-10">
                        <span className="material-symbols-rounded !text-4xl !max-w-[36px]">
                            sports_esports
                        </span>
                        <span>Oyna.OrleansMC.Com</span>
                        <span>{playerCount}</span>
                    </Button>
                </div>
            </header>
        </>
    )
}