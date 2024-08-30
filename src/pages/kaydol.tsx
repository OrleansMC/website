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


RegisterPage.getLayout = function getLayout(page: React.ReactNode, pageProps: PageProps) {
    return (
        <Layout
            user={pageProps.user}
            title="OrleansMC - Kaydol"
            description="OrleansMC Minecraft sunucusuna kaydolun."
            ogDescription="OrleansMC Minecraft sunucusuna kaydolun."
        >
            {page}
        </Layout>
    )
}

export default function RegisterPage(props: PageProps) {
    const router = useRouter();
    const recaptchaRef = React.createRef<ReCAPTCHA>();

    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [recaptchaVisible, setRecaptchaVisible] = React.useState<boolean>(false);
    const [submitting, setSubmitting] = React.useState<boolean>(false);
    const [pinRequested, setPinRequested] = React.useState<boolean>(false);
    const [pendingEmail, setPendingEmail] = React.useState<string>('');
    const [pendingUsername, setPendingUsername] = React.useState<string>('');
    const [pendingPassword, setPendingPassword] = React.useState<string>('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (submitting) {
            return;
        }

        const token = recaptchaRef.current?.getValue();
        if (!token && !pinRequested) {
            setRecaptchaVisible(true);
            return;
        }

        recaptchaRef.current?.reset();
        setRecaptchaVisible(false);

        const username = (e.currentTarget.querySelector('#username') as HTMLInputElement)?.value || pendingUsername;
        const email = (e.currentTarget.querySelector('#email') as HTMLInputElement)?.value || pendingEmail;
        const password = (e.currentTarget.querySelector('#password') as HTMLInputElement)?.value || pendingPassword;
        const passwordAgain = (e.currentTarget.querySelector('#password-again') as HTMLInputElement)?.value || pendingPassword;

        setPendingEmail(email);
        setPendingUsername(username);
        setPendingPassword(password);

        if (!Util.isValidEmail(email)) {
            const emailInput = e.currentTarget.querySelector('#email') as HTMLInputElement;
            emailInput.value = '';
            emailInput.focus();
            setErrorMessage('Sadece Gmail ve iCloud e-posta adresleri kabul edilmektedir.');
            return;
        }

        try {
            Util.validateMinecraftNickname(username);
        } catch (error) {
            setErrorMessage((error as Error).message);
            return;
        }

        if (password !== passwordAgain) {
            const passwordInput = e.currentTarget.querySelector('#password') as HTMLInputElement;
            const passwordAgainInput = e.currentTarget.querySelector('#password-again') as HTMLInputElement;
            if (passwordInput && passwordAgainInput) {
                passwordInput.value = '';
                passwordAgainInput.value = '';
                passwordInput.focus();
            }
            setErrorMessage('Şifreler uyuşmuyor.');
            return;
        }

        setSubmitting(true);

        let pin = '';
        for (let i = 0; i < 6; i++) {
            pin += (document.getElementById(`pin-${i}`) as HTMLInputElement)?.value;
        }

        try {
            await axios.post('/api/auth/register', {
                email: email,
                username: username,
                password: password,
                captcha: token || undefined,
                pin: pinRequested ? pin || "undefined" : undefined
            });

            if (pinRequested) {
                router.back();
                return;
            }
            setPinRequested(true);
            setErrorMessage('');
            setSubmitting(false);
        } catch (error) {
            setErrorMessage((error as any).response.data.name);
            setSubmitting(false);
        }
    }

    const getPinInput = (index: number) => {
        return <input type="text" maxLength={1} pattern="[0-9]{1}"
            id={`pin-${index}`}
            className='w-16 h-16 p-4 outline-none bg-dark-850 border-2 border-dark-500 rounded-lg text-center text-2xl'
            onKeyUp={(e) => {
                if (e.key === 'Backspace') {
                    (document.getElementById(`pin-${index - 1}`) as HTMLInputElement)?.focus();
                } else {
                    (document.getElementById(`pin-${index + 1}`) as HTMLInputElement)?.focus();
                }
            }}
        />
    }

    return (
        <div className='w-full flex justify-between items-center mt-36 mb-36 gap-28 flex-wrap' data-aos="fade-up">
            <div className='flex-[5_0_0%] flex justify-end items-end min-w-[23rem]'>
                <Image
                    src="/uploads/wizard_90f703e5a7.png"
                    alt="Register Image"
                    placeholder='blur'
                    blurDataURL='/uploads/thumbnail_wizard_94979b4765.png'
                    width={480}
                    height={480}
                />
            </div>
            <div className='flex-[9_0_0%]' >
                <h1 className='text-4xl font-semibold'>Kaydol</h1>
                {
                    submitting &&
                    <p className='text-zinc-400 mt-4'>İşlem yapılıyor...</p>
                }
                {!errorMessage && !submitting && <p className='text-zinc-400 mt-4'>
                    {
                        pinRequested ?
                            'E-posta adresinize gönderilen pin kodunu girin' :
                            'Büyük küçük harflere dikkat ederek doğru bilgileri giriniz!'
                    }
                </p>}
                {
                    errorMessage && !submitting &&
                    <p className='text-red-500 mt-4'>{errorMessage}</p>
                }
                <form className='mt-4 flex flex-col gap-4' onSubmit={onSubmit}>
                    {!pinRequested ? <>
                        <Input
                            id='username'
                            type="text"
                            placeholder="Minecraft Adı"
                        />
                        <Input
                            id='email'
                            type="email"
                            placeholder="E-Posta Adresi"
                        />
                        <Input
                            id='password'
                            type="password"
                            placeholder="Şifre"
                        />
                        <Input
                            id='password-again'
                            type="password"
                            placeholder="Şifre Tekrar"
                        />
                    </> : <>
                        <div className='flex gap-2'>
                            {
                                Array.from({ length: 3 }).map((_, index) => getPinInput(index))
                            }
                            <span className='text-zinc-400 text-lg flex items-center mx-2'>
                                -
                            </span>
                            {
                                Array.from({ length: 3 }).map((_, index) => getPinInput(index + 3))
                            }
                        </div>
                    </>}
                    <ReCAPTCHA
                        style={{ display: recaptchaVisible ? 'block' : 'none' }}
                        ref={recaptchaRef}
                        className='mt-2 w-min'
                        sitekey="6LfqPi4qAAAAAIK5m2YK_iSDStqsCzU1FPBwLcK8"
                    />
                    <label className='flex items-center m-1'>
                        <input
                            required
                            type="checkbox"
                            className='rounded-lg w-5 h-5 accent-purple-500 duration-300 hover:accent-[#a950fa]'
                        />
                        <span className='ml-2 text-base text-zinc-400'>
                            <a href="/rules" className='text-purple-400 hover:text-purple-300 duration-300'>
                                Kurallar
                            </a>, <a href="/terms" className='text-purple-400 hover:text-purple-300 duration-300'>
                                Kullanım Şartları
                            </a> ve <a href="/privacy" className='text-purple-400 hover:text-purple-300 duration-300'>
                                Gizlilik Politikası
                            </a>
                            'nı okudum ve kabul ediyorum
                        </span>
                    </label>
                    <button
                        type="submit"
                        className='p-4 bg-purple-500 text-zinc-200 rounded-lg hover:bg-purple-400 duration-300'
                    >
                        Kaydol
                    </button>
                </form>
                <div className='mt-6'>
                    <span className='text-zinc-400'>Hesabınız var mı?</span>
                    <Link
                        href={'/giris-yap'}
                        className='ml-2 text-purple-400 hover:text-purple-300'
                    >
                        Giriş Yap
                    </Link>
                </div>

            </div>
        </div>
    )
}

export const getServerSideProps = (async (ctx) => {
    return {
        props: {
            user: await AuthManager.getInstance().getUserFromContext(ctx)
        }
    }
}) satisfies GetServerSideProps<{ user: User | null }>
