import Link from "next/link";
import React from "react";

export type ButtonProps = {
    children: React.ReactNode;
    className?: string;
} & (
    {
        type: "link";
        href: string;
    } | {
        type: "button";
        onClick: () => void;
    }
)

export default function Button(props: ButtonProps) {
    const { children, className = "", type } = props;
    const classNames = `flex items-center space-x-2 text-center shadow-lg text-lg rounded-md shadow-lg font-semibold text-white transition duration-300 leading-7 px-5 py-2 cursor-pointer ${className}`;

    if (type === "link") {
        const { href } = (props as any);
        return (
            <Link
                href={href} 
                className={classNames}
            >
                {children}
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