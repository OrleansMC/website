import React from 'react'

export default function Loading({ loading }: { loading: boolean }) {
    // @ts-ignore
    const lottie = <lottie-player
        id="loading"
        speed={2}
        loop={true}
        autoplay={true}
        mode="normal"
        src="/uploads/loading_ffa81742de.json"
    />

    return (
        <div className={
            "fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-40 h-screen w-screen"
            + (loading ? "" : " hidden")
        }>
            <div className="w-52 h-52">
                {lottie}
            </div>
        </div>
    )
}