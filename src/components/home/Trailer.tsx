import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import Button from "../common/Button";

export default function Trailer() {
    return (
        <section className="flex flex-col justify-center items-center space-y-8" data-aos="fade-up" data-offset="100">
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl font-semibold mb-3"
                >OrleansMC'yi Keşfedin</h2>
                <p className="text-lg text-center text-zinc-400"
                >Sunucumuzun tanıtım videosunu izleyerek OrleansMC'nin dünyasını keşfedin!</p>
            </div>
            <div className="w-3/4 rounded-lg overflow-hidden shadow-lg md:w-full">
                <LiteYouTubeEmbed
                    poster="maxresdefault"
                    thumbnail="https://strapi.orleansmc.com/uploads/castle_entrance_3ef073eff4.png"
                    id="nkIAsR0UBfY"
                    params="afmt=251&iv_load_policy=3&modestbranding=1&rel=0"
                    title="OrleansMC Trailer"
                />
            </div>
        </section>
    )
}