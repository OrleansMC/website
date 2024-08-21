import Image from "next/image";
import React from "react";
import Button from "../common/Button";

export default function Hero() {
    return (
        <header data-aos="fade-down" data-offset="100">
            <div className="flex flex-col justify-center items-center h-[48rem]">
                <Image className=""
                    src="/uploads/logo_ae2b79e367.png" alt="Logo"
                    quality={100}
                    placeholder="blur"
                    blurDataURL={"/_next/image?url=/uploads/logo_ae2b79e367.png&w=750&q=5"}
                    width={245 * 2.75}
                    height={53 * 2.75}
                />
                <Button type="button" onClick={() => { }}
                    className="bg-gray-500/85 hover:bg-gray-500 mt-10">
                    <span className="material-symbols-rounded !text-4xl">
                        sports_esports
                    </span>
                    <span>Oyna.OrleansMC.Com</span>
                    <span>32</span>
                </Button>
            </div>
        </header>

    )
}