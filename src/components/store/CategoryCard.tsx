import React from "react"
import Image from "next/image"
import Button from "../common/Button"

export default function CategoryCard(props: {
    title: string
    description: string
    icon: string
    href: string
    button_text: string
}) {
    return (
        <div className='flex-[1_0_0%] min-w-[250px]' data-aos="zoom-in">
            <div
                className='flex relative p-8 md:p-6 rounded-lg shadow-lg 
                before:backdrop-blur-sm before:z-10 before:rounded-lg 
                bg-[url("/uploads/cave_00794007df.png")] bg-cover bg-center bg-no-repeat 
                before:absolute before:top-0 before:left-0 before:w-full before:h-full 
                before:bg-black/70 md:flex-col-reverse'>
                <div className='flex flex-col gap-4 z-20 md:items-center md:gap-1'>
                    <h2 className='text-4xl font-semibold z-20 md:text-center'>
                        {props.title}
                    </h2 >
                    <p className='text-xl mt-4 md:text-center md:mt-2'>
                        {props.description}
                    </p>
                    <div onClick={(e) => {
                        if (props.href !== "/magaza/rutbeler") {
                            alert("Kasaları oyun içerisinde inceleyebilir ve /kredi-market menüsünden satın alabilirsiniz.")
                            e.preventDefault()
                        }
                    }}>
                        <Button
                            type="link"
                            href={props.href}
                            className="z-20 mt-4 bg-blue-500 hover:bg-blue-400 w-fit">
                            {props.button_text}
                        </Button>
                    </div>
                </div>
                <div className='z-20 md:px-24 md:mb-6'>
                    <Image
                        src={props.icon}
                        alt={props.title + " Icon"}
                        width={250}
                        height={250}
                        placeholder='blur'
                        blurDataURL={props.icon.replace("/uploads/", "/uploads/thumbnail_")}
                    />
                </div>
            </div>
        </div>
    )
}