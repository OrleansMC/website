import { Guide } from '@/lib/server/guides/GuideManager';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function GuideCard({ guide }: { guide: Guide }) {
    return (
        <Link
            href={`/rehber/${guide.attributes.path}`}
            className="lg:w-full flex-[1_0_0%] hover:scale-105 transition-transform transform-gpu duration-300">
            <div style={{ backgroundColor: guide.attributes.background }}
                className="rounded-lg p-6 min-w-80 h-80 flex justify-center items-center 
                w-full 
                ">
                <Image
                    className='w-fit h-60'
                    src={guide.attributes.icon.data.attributes.url}
                    alt={guide.attributes.title + " Icon"}
                    width={210}
                    height={210}
                    placeholder='empty'
                />
            </div>
            <div className="mt-4">
                <h2 className="text-2xl font-semibold text-center"
                >{guide.attributes.title}</h2>
            </div>
        </Link>
    )
}