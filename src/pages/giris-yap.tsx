import Input from '@/components/register/Input';
import Layout from '@/layouts/Layout'
import Util from '@/lib/common/Util';
import { User } from '@/lib/server/auth/AuthManager';
import AuthManager from '@/lib/server/auth/AuthManager';
import { PageProps } from '@/types';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";

LoginPage.getLayout = function getLayout(page: React.ReactNode, pageProps: PageProps) {
    return (
        <Layout
            title="OrleansMC - Giriş Yap"
            description="OrleansMC'nin web sitesine giriş yapın."
            ogDescription="OrleansMC'nin web sitesine giriş yapın."
            user={pageProps.user}
        >
            {page}
        </Layout>
    )
}

export default function LoginPage(props: PageProps) {
    const router = useRouter();
    const recaptchaRef = React.createRef<ReCAPTCHA>();

    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [recaptchaVisible, setRecaptchaVisible] = React.useState<boolean>(false);
    const [submitting, setSubmitting] = React.useState<boolean>(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (submitting) {
            return;
        }

        const token = recaptchaRef.current?.getValue();
        if (!token) {
            setRecaptchaVisible(true);
            return;
        }

        recaptchaRef.current?.reset();
        setRecaptchaVisible(false);

        const username = (e.currentTarget.querySelector('#username') as HTMLInputElement).value;
        const password = (e.currentTarget.querySelector('#password') as HTMLInputElement).value;

        try {
            Util.validateMinecraftNickname(username);
        } catch (error) {
            setErrorMessage("Minecraft adı geçersiz.");
            return;
        }
        setSubmitting(true);


        try {
            await axios.post('/api/auth/login', {
                username,
                password,
                captcha: token
            });

            router.back();
            setErrorMessage('');
            setSubmitting(false);
        } catch (error) {
            setErrorMessage((error as any).response.data.name);
            setSubmitting(false);
        }
    }

    return (
        <>
            <div className='w-full flex justify-between items-center mt-36 mb-36 gap-28 flex-wrap' data-aos="fade-down">
                <div className='flex-[5_0_0%] flex justify-end items-end min-w-[23rem]'>
                    <Image
                        src="/uploads/wizard_90f703e5a7.png"
                        alt="Register Image"
                        placeholder='blur'
                        blurDataURL='/uploads/thumbnail_wizard_90f703e5a7.png'
                        width={480}
                        height={480}
                    />
                </div>
                <div className='flex-[9_0_0%]' >
                    <h1 className='text-4xl font-semibold'>Giriş Yap</h1>
                    {
                        submitting &&
                        <p className='text-zinc-400 mt-4'>İşlem yapılıyor...</p>
                    }
                    {!errorMessage && !submitting && <p className='text-zinc-400 mt-4'>
                        Hesabınıza giriş yapmak için aşağıdaki bilgileri doldurun.
                    </p>}
                    {
                        errorMessage && !submitting &&
                        <p className='text-red-500 mt-4'>{errorMessage}</p>
                    }
                    <form className='mt-4 flex flex-col gap-4' onSubmit={onSubmit}>
                        <Input
                            id='username'
                            type="text"
                            placeholder="Minecraft Adı"
                        />
                        <Input
                            id='password'
                            type="password"
                            placeholder="Şifre"
                        />
                        <label className='flex items-center m-1 cursor-pointer w-fit'>
                            <input
                                type="checkbox"
                                className='rounded-lg w-5 h-5 accent-purple-500 duration-300 hover:accent-[#a950fa]'
                            />
                            <span className='ml-2 text-base text-zinc-400'>
                                Beni Hatırla
                            </span>
                        </label>
                        <ReCAPTCHA
                            style={{ display: recaptchaVisible ? 'block' : 'none' }}
                            ref={recaptchaRef}
                            className='mt-2 w-min'
                            sitekey="6LfqPi4qAAAAAIK5m2YK_iSDStqsCzU1FPBwLcK8"
                        />
                        <button
                            type="submit"
                            className='p-4 bg-purple-500 text-zinc-200 rounded-lg hover:bg-purple-400 duration-300'
                        >
                            Giriş Yap
                        </button>
                    </form>
                    <div className='mt-6'>
                        <span className='text-zinc-400'>Şifrenizi mi unuttunuz?</span>
                        <Link
                            href={'/sifreni-sifirla'}
                            className='ml-2 text-purple-400 hover:text-purple-300'
                        >
                            Şifreni Sıfırla
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export const getServerSideProps = (async (ctx) => {
    return {
        props: {
            user: await AuthManager.getInstance().getUserFromContext(ctx)
        }
    }
}) satisfies GetServerSideProps<{ user: User | null }>
