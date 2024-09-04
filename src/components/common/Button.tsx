import Link from "next/link";
import React, { useEffect, useRef } from "react";
import PopUp from "./PopUp";
import { createRoot, Root } from "react-dom/client";
import Image from "next/image";

export type ButtonProps = {
    id?: string;
    children: React.ReactNode;
    className?: string;
} & (
        {
            type: "link";
            href: string;
            blank?: boolean;
        } | {
            type: "button";
            onClick: () => void;
        }
    )

export default function Button(props: ButtonProps) {
    const { children, className = "", type } = props;
    const classNames = `flex items-center space-x-2 text-center text-lg rounded-md font-semibold text-white transition duration-300 leading-7 px-5 py-2 cursor-pointer${className.includes(" bg-") ? " shadow-lg" : ""} ${className}`;

    const coinRef = React.useRef(null);
    const [showPopUp, setShowPopUp] = React.useState<boolean>(false);

    // @ts-ignore
    const lottie = <lottie-player
        id="navbar_coin"
        ref={coinRef}
        speed={1}
        loop={true}
        hover={false}
        mode="normal"
        src="/uploads/coins_75c0679ecf.json"
    />
    const rootRef = useRef<Root | null>(null);

    const popUp =
        <PopUp show={showPopUp} title="Dikkat!"
            footer={
                <Button type="button" onClick={() => {
                    setShowPopUp(false);
                    window.open("/kredi-yukle", "_blank");
                }} className="bg-green-500/85 hover:bg-green-500 px-5 py-2">
                    Kredi Yüklemeye Devam Et
                </Button>
            }
            onClose={() => {
                setShowPopUp(false);
            }}>
            <>
                <p className="text-lg text-center text-yellow-200 max-w-[550px]">
                    Kredi yüklerken gireceğiniz mail adresinizin, bu siteye kayıtlı
                    olan mail adresinizle aynı olması gerekmektedir!
                </p>
                <Image
                    className="w-full rounded-md overflow-hidden mt-4 max-w-[550px]"
                    src="/uploads/purchase_dfedfba540.png"
                    alt="Kredi Yükle"
                    width={800}
                    height={300}
                    placeholder="empty"
                />
            </>
        </PopUp>
    if (type === "link") {
        const { href } = (props as any);
        if (href.includes("kredi-yukle")) {

            useEffect(() => {
                if (showPopUp && rootRef.current) {
                    rootRef.current.render(popUp);
                };
            }, [popUp]);

            useEffect(() => {
                let popUpWrapper = document.getElementById("popup-wrapper");

                if (rootRef.current && !showPopUp && popUpWrapper) {
                    rootRef.current.render(popUp);

                    setTimeout(() => {
                        rootRef.current?.unmount();
                        popUpWrapper?.remove();
                        rootRef.current = null;
                    }, 250);
                    return;
                } else if (popUpWrapper) {
                    popUpWrapper.remove();
                }

                popUpWrapper = document.createElement("div");
                popUpWrapper.id = "popup-wrapper";
                document.body.firstChild?.appendChild(popUpWrapper);

                rootRef.current = createRoot(popUpWrapper);
                rootRef.current.render(popUp);
            }, [showPopUp]);

            return (
                <button
                    id={props.id} className={classNames + " lg:ml-6"}
                    onClick={() => {
                        setShowPopUp(true);
                    }}
                    onMouseEnter={
                        () => {
                            const lottiePlayer = coinRef.current as any;
                            lottiePlayer?.play();
                        }
                    } onMouseLeave={
                        () => {
                            const lottiePlayer = coinRef.current as any;
                            lottiePlayer?.pause();
                        }
                    }
                >{children}<span className="w-8 h-8 ml-2"> {lottie} </span></button>
            )
        }

        return (
            <Link
                href={href} id={props.id} className={classNames}
                target={href.includes("http") ? "_blank" : props.blank ? "_blank" : "_self"}
            >{children}</Link>
        )
    } else {
        const { onClick } = (props as any);
        return (
            <button
                onClick={onClick} id={props.id} className={classNames}
            >
                {children}
            </button>
        )
    }
}