import Link from "next/link";
import React from "react";

export type ButtonProps = {
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

    if (type === "link") {
        const { href } = (props as any);
        return (
            <Link
                href={href}
                className={classNames + (href.includes("kredi-yukle") ? " lg:ml-6" : "")}
                target={href.includes("http") ? "_blank" : props.blank ? "_blank" : "_self"}
                onMouseEnter={
                    () => {
                        if (href.includes("kredi-yukle")) {
                            const lottiePlayer = coinRef.current as any;
                            lottiePlayer?.play();
                        }
                    }
                } onMouseLeave={
                    () => {
                        if (href.includes("kredi-yukle")) {
                            const lottiePlayer = coinRef.current as any;
                            lottiePlayer?.pause();
                        }
                    }
                }
            >
                {children}
                {
                    href.includes("kredi-yukle") ?
                        <span className="w-8 h-8 ml-2">
                            {lottie}
                        </span> : null
                }
            </Link>
        )
    } else {
        const { onClick } = (props as any);
        return (
            <button
                onClick={onClick}
                className={classNames}
            >
                {children}
            </button>
        )
    }
}