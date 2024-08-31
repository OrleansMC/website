import PopUp from '@/components/common/PopUp'
import Layout from '@/layouts/Layout'
import UUIDManager from '@/lib/client/UUIDManager'
import { User } from '@/lib/server/auth/AuthManager'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'


export default function ProfileHeader({ user }: { user: User }) {
    const router = useRouter();
    const [resyncHover, setResyncHover] = React.useState<boolean>(false);

    const avatarTemplates = [
        `https://starlightskins.lunareclipse.studio/render/cheering/{uuid}/bust?borderHighlight=true&borderHighlightRadius=5`,
        `https://starlightskins.lunareclipse.studio/render/pointing/{uuid}/bust?borderHighlight=true&borderHighlightRadius=5`,
        `https://starlightskins.lunareclipse.studio/render/reading/{uuid}/bust?borderHighlight=true&borderHighlightRadius=5`,
        `https://starlightskins.lunareclipse.studio/render/relaxing/{uuid}/bust?borderHighlight=true&borderHighlightRadius=5`
    ]

    const randomAvatar = avatarTemplates[Math.floor(Math.random() * avatarTemplates.length)];
    const [avatar, setAvatar] = React.useState<string>(randomAvatar.replace("{uuid}", user.player.name));

    useEffect(() => {
        (async () => {
            const uuid = await UUIDManager.getInstance().getUUID(user.username);
            setAvatar(randomAvatar.replace("{uuid}", uuid));
        })();
    }, [user]);

    const [isPopupBlocked, setIsPopupBlocked] = React.useState<boolean>(false);

    const openLoginPopUp = () => {
        const newPage = window.open(`/api/discord/sync`, '_blank', `width=${Math.floor(screen.width) / 2.5}, height=${screen.height}`);

        if (!newPage) {
            setIsPopupBlocked(true);
            return;
        }

        let interval = setInterval(function () {
            try {
                if (newPage.location.host == window.location.host &&
                    newPage.location.pathname.includes("/") && newPage.history.length > 1) {
                    newPage.close();
                }
            } catch (e) { }

            if (newPage.closed) {
                clearInterval(interval);
                router.reload();
            };
        }, 100);
    };

    return (
        <header className='mt-28'>
            <PopUp
                title="Popup Engellendi!"
                show={isPopupBlocked}
                onClose={() => setIsPopupBlocked(false)}
            >
                <p>Popup engellendi. Lütfen engellemeyi kaldırın ve tekrar deneyin.</p>
            </PopUp>
            <div className='
                flex flex-col relative p-12 md:p-12 rounded-lg 
                shadow-lg bg-[url("/uploads/lake_56a90cdd03.png")] bg-cover bg-center 
                bg-no-repeat bg-opacity-90 h-96 
                before:bg-black before:bg-opacity-60 before:absolute before:inset-0 z-10
                ' data-aos="fade-down"
                >
                <div className='flex flex-col md:flex-row items-center justify-between z-20'>
                    <div className='flex flex-row items-center justify-center gap-4'>
                        <div data-aos="fade-right" data-aos-delay="1000">
                            <Image
                                loading='eager'
                                className='mr-6'
                                unoptimized
                                src={avatar}
                                width={300}
                                height={300}
                                alt='Avatar'
                            />
                        </div>
                        <div className='flex flex-col items-start' data-aos="fade-left" data-aos-delay="1000">
                            <h1 className='text-4xl font-semibold text-zinc-200 mt-8'>
                                {user.player.name}
                            </h1>
                            <div className='flex gap-1 mt-1 items-center text-zinc-400'>
                                <span className='text-lg font-semibold'>
                                    {user.email}
                                </span>
                            </div>
                            <div className='flex gap-2 mt-2 flex-wrap items-center'>
                                {
                                    !user.discord ? (
                                        <button
                                            onClick={openLoginPopUp}
                                            className='flex mt-4 gap-2 items-center bg-dark-200 px-4 py-2
                                    rounded-md shadow-lg backdrop-blur-md hover:bg-dark-100 duration-300'>
                                            <svg className="w-7 h-7"
                                                viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="#ffffff" fillRule="nonzero"> </path> </g> </g>
                                            </svg>
                                            <span className='text-lg font-semibold text-zinc-200'>
                                                Discord: Eşlenmemiş
                                            </span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={openLoginPopUp}
                                            className='flex mt-4 gap-2 items-center justify-center bg-blue-500 px-4 py-2
                                    rounded-md shadow-lg backdrop-blur-md hover:bg-blue-400 duration-300'>
                                            {
                                                resyncHover ?
                                                    <span className="material-symbols-rounded w-7 h-7 text-2xl">
                                                        directory_sync
                                                    </span> :
                                                    <svg className="w-7 h-7"
                                                        viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000">
                                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="#ffffff" fillRule="nonzero"> </path> </g> </g>
                                                    </svg>
                                            }
                                            <span className='text-lg font-semibold text-zinc-200'>
                                                Discord: {user.discord.global_name}
                                            </span>
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}