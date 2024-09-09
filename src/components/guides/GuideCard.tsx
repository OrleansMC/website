import { Guide } from '@/lib/server/guides/GuideManager';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from "@/styles/guides.module.scss";

export default function GuideCard({ guide }: { guide: Guide }) {
    return (
        <Link
            href={`/rehber/${guide.attributes.path}`}
            className="lg:w-full guide_card flex-[1_0_0%] hover:scale-105 
            transition-transform transform-gpu duration-300 w-full">
            <div className={styles.guide_card__icon + " min-w-80 h-80 "}>
                <div className={styles.guide_card__icon__background}
                    style={{ background: `url(${guide.attributes.icon.data.attributes.url}) center center / cover no-repeat` }}></div>
                <Image
                    src={guide.attributes.icon.data.attributes.url}
                    alt="Server Icon"
                    width={210}
                    height={210}
                    placeholder='blur'
                    blurDataURL={guide.attributes.icon.data.attributes.url
                        .replace("/uploads/", "/uploads/thumbnail_")
                    }
                />
            </div>
            <div className="mt-4">
                <h2 className="text-2xl font-semibold text-center"
                >{guide.attributes.title}</h2>
            </div>
        </Link>
    )
}