import React from "react"
import Image from "next/image"
import Button from "../common/Button"
import 'animate.css';
import Util from "@/lib/common/Util";
import PopUp from "../common/PopUp";
import { User } from "@/lib/server/auth/AuthManager";
import { useRouter } from "next/router";

export default function RankCard(props: {
    user?: User;
    title: string;
    price: number;
    credit_market_id: string;
    discount?: {
        percentage: number;
        end_date: string | Date;
    };
    icon: string;
}) {
    const [showPopup, setShowPopup] = React.useState(false);
    const [purchasing, setPurchasing] = React.useState(false);
    const coinRef = React.useRef<HTMLTemplateElement>(null);
    const coinRef2 = React.useRef<HTMLTemplateElement>(null);

    let discount = props.discount;
    if (discount) {
        const end_date = new Date(discount.end_date);
        const now = new Date();
        if (end_date < now) {
            discount = undefined;
        }
    }

    
    const _price = Math.floor(props.price * 100 / (100 - (props.discount?.percentage || 0)));
    const price = props.price;

    const buttonId = Util.slugify(props.title) + "_buy";

    // @ts-ignore
    const lottie = <lottie-player
        id="upgrade_crown"
        ref={coinRef}
        speed={1}
        loop={true}
        hover={false}
        mode="normal"
        src="/uploads/coins_75c0679ecf.json"
    />

    // @ts-ignore
    const lottie2 = <lottie-player
        id="upgrade_crown"
        ref={coinRef2}
        speed={1}
        loop={true}
        hover={false}
        mode="normal"
        src="/uploads/coins_75c0679ecf.json"
    />

    const randomId = Math.random().toString(36).substring(7);
    const iconId = "rank_card_" + randomId;
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
    const [alreadyHasARank, setAlreadyHasARank] = React.useState<boolean>(false);

    const router = useRouter();

    return (
        <>
            <PopUp
                show={showPopup}
                title={props.title}
                onClose={() => setShowPopup(false)}
                onMouseEnter={
                    () => {
                        const lottiePlayer = coinRef2.current as any;
                        lottiePlayer?.play();
                    }
                }
                onMouseLeave={
                    () => {
                        const lottiePlayer = coinRef2.current as any;
                        lottiePlayer?.pause();
                    }
                }
                footer={
                    alreadyHasARank ? <Button
                        type="button"
                        onClick={() => {
                            setShowPopup(false);
                            setAlreadyHasARank(false);
                            window.open("/destek", "_blank");
                        }}
                        className="bg-blue-500 hover:bg-blue-400 w-fit"
                    >
                        Destek Ekibine Ulaş
                    </Button> :
                        successMessage ? <Button
                            type="button"
                            onClick={() => {
                                setShowPopup(false);
                                setSuccessMessage(null);
                                router.replace("/magaza/rutbeler", undefined, { shallow: false });
                            }}
                            className="bg-green-500 hover:bg-green-400 w-fit"
                        >
                            Tamam
                        </Button>
                            :
                            errorMessage ? <Button
                                type="button"
                                onClick={() => {
                                    setShowPopup(false);
                                    setErrorMessage(null);
                                    router.push("/magaza/rutbeler");
                                }}
                                className="bg-red-500 hover:bg-red-400 w-fit"
                            >
                                Tamam
                            </Button>
                                :
                                props.user ?
                                    <Button
                                        type="button"
                                        onClick={async () => {
                                            if (purchasing) return;
                                            setPurchasing(true);
                                            const response = await fetch("/api/store/purchase/rank/" + Util.slugify(props.credit_market_id), {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({})
                                            });

                                            if (response.status === 200) {
                                                setSuccessMessage("Satın alma işlemi başarılı!");
                                            } else {
                                                const data = await response.json();
                                                setErrorMessage(data.name);
                                            }
                                            setPurchasing(false);
                                        }}
                                        className="bg-blue-500 hover:bg-blue-400 w-fit"
                                    >
                                        {purchasing ? "Satın Alınıyor..." : "Onayla"}
                                    </Button>

                                    : <Button
                                        type="button"
                                        onClick={() => {
                                            setShowPopup(false);
                                            router.push("/giris-yap");
                                        }}
                                        className="bg-blue-500 hover:bg-blue-400 w-fit"
                                    >
                                        Giriş Yap
                                    </Button>
                }
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 p-4">
                        {
                            alreadyHasARank ?
                                <div className="text-zinc-200 rounded-lg max-w-[28rem] text-center text-lg">
                                    Zaten bir rütbe sahibisiniz! Eğer bunu değiştirmek
                                    istiyorsanız destek ekibimizle iletişime geçebilirsiniz.
                                </div>
                                :
                                successMessage ?
                                    <div className="bg-green-500 text-white p-2 rounded-lg">
                                        {successMessage}
                                    </div>
                                    :
                                    errorMessage ?
                                        <div className="bg-red-500 text-white p-2 rounded-lg">
                                            {errorMessage}
                                        </div>
                                        :
                                        props.user ? <p className="text-lg text-zinc-200 max-w-[28rem] text-center">
                                            Bu rütbeyi <span className="text-yellow-400 font-semibold inline-block">
                                                <span>
                                                    {new Intl.NumberFormat().format(price).replaceAll(",", ".")}
                                                </span>
                                                <span className="inline-block w-6 h-6 top-1 relative">
                                                    {lottie2}
                                                </span>
                                            </span> karşılığında satın almayı
                                            onaylıyor musunuz?
                                        </p>
                                            : <p className="text-lg text-zinc-200 max-w-[28rem] text-center">
                                                Bu rütbeyi satın alabilmek için giriş yapmalısınız.
                                            </p>}
                    </div>
                </div>
            </PopUp>
            <div className='flex-[1_0_0%] min-w-[525px] p-6 rounded-lg shadow-lg 
        bg-dark-950 flex gap-6 items-center relative md:flex-col md:min-w-56' data-aos="zoom-in"
                onMouseEnter={
                    () => {
                        const lottiePlayer = coinRef.current as any;
                        lottiePlayer?.play();

                        const icon = document.getElementById(iconId);
                        icon?.classList.add("animate__flip", "animate__animated");
                    }
                } onMouseLeave={
                    () => {
                        const lottiePlayer = coinRef.current as any;
                        lottiePlayer?.pause();

                        const icon = document.getElementById(iconId);
                        icon?.classList.remove("animate__flip", "animate__animated");
                    }
                }>
                <div>
                    <Image
                        className="animate__delay-0.5s"
                        id={iconId}
                        src={props.icon}
                        alt={props.title + " Icon"}
                        width={140}
                        height={140}
                        placeholder='blur'
                        blurDataURL={props.icon.replace("/uploads/", "/uploads/thumbnail_")}
                    />
                </div>
                <div className="md:flex md:flex-col md:items-center">
                    <h2 className='text-2xl font-semibold mb-2 uppercase md:text-center'>
                        {props.title}
                    </h2>
                    <div className="md:flex md:flex-col md:items-center">
                        {discount &&
                            <div>
                                <span className='text-zinc-400 text-xl strike w-fit md:text-center'
                                >{new Intl.NumberFormat().format(_price).replaceAll(",", ".")}</span>
                            </div>
                        }
                        <div className="flex items-center gap-1 w-full md:justify-center">
                            <h3 className='text-2xl font-semibold text-yellow-400'>
                                {new Intl.NumberFormat().format(
                                    price
                                ).replaceAll(",", ".")}
                            </h3>
                            <div className='w-6 h-6'>
                                {lottie}
                            </div>
                        </div>
                        {
                            discount &&
                            <div className="text-zinc-200 text-lg mt-2 flex items-center gap-1">
                                <span className="material-symbols-rounded">
                                    timer
                                </span>
                                <span>
                                    Son {
                                        Util.msToTime(new Date(discount.end_date).getTime() - new Date().getTime())
                                            .replace(/,/g, "")
                                    }!
                                </span>
                            </div>
                        }
                    </div>
                    <Button
                        id={buttonId}
                        type="button"
                        onClick={() => {
                            if (props.user) {
                                if (props.user.player.rank !== "player") {
                                    setAlreadyHasARank(true);
                                }
                            }
                            setShowPopup(true);
                        }}
                        className="mt-4 bg-blue-500 hover:bg-blue-400 w-fit absolute right-6 bottom-6 md:relative md:right-0 md:bottom-0">
                        Satın Al
                    </Button>
                </div>
            </div>
        </>
    )
}