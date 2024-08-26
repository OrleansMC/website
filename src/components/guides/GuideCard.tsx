import { Guide } from '@/lib/server/guides/GuideManager';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function GuideCard({ guide }: { guide: Guide }) {
    return (
        <Link
            href={`/rehber/${guide.attributes.path}`}
            className="w-fit lg:w-full">
            <div style={{ backgroundColor: guide.attributes.background }}
                className="rounded-lg p-6 w-80 h-80 flex justify-center items-center lg:w-full">
                <Image
                    className='hover:scale-105 transition-transform transform-gpu duration-300 w-fit h-60'
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