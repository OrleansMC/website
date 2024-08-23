import Input from '@/components/register/Input';
import Layout from '@/layouts/Layout'
import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'

export default function LoginPage() {
    const router = useRouter();

    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = (e.currentTarget.querySelector('#username') as HTMLInputElement).value;
        const email = (e.currentTarget.querySelector('#email') as HTMLInputElement).value;
        const password = (e.currentTarget.querySelector('#password') as HTMLInputElement).value;
        const passwordAgain = (e.currentTarget.querySelector('#password-again') as HTMLInputElement).value;

        const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|icloud\.com)$/;

        if (!emailPattern.test(email)) {
            const emailInput = e.currentTarget.querySelector('#email') as HTMLInputElement;
            emailInput.value = '';
            emailInput.focus();
            setErrorMessage('Sadece Gmail ve iCloud e-posta adresleri kabul edilmektedir.');
            return;
        }

        if (password !== passwordAgain) {
            const passwordInput = e.currentTarget.querySelector('#password') as HTMLInputElement;
            const passwordAgainInput = e.currentTarget.querySelector('#password-again') as HTMLInputElement;
            passwordInput.value = '';
            passwordAgainInput.value = '';
            passwordInput.focus();
            setErrorMessage('Şifreler uyuşmuyor.');
            return;
        }
    }

    return (
        <Layout
            title="OrleansMC - Kaydol"
            description="OrleansMC, Minecraft sunucusu. Türkiye'nin en iyi Minecraft sunucusu."
            ogDescription="OrleansMC, Minecraft sunucusu. Türkiye'nin en iyi Minecraft sunucusu."
        >
            <div className='w-full flex justify-between items-center mt-36 mb-36 gap-28 flex-wrap' data-aos="fade-up">
                <div className='flex-[5_0_0%] flex justify-end items-end min-w-[23rem]'>
                    <Image
                        src="/uploads/wizard_90f703e5a7.png"
                        alt="Register Image"
                        width={480}
                        height={480}
                    />
                </div>
                <div className='flex-[9_0_0%]' >
                    <h1 className='text-4xl font-semibold'>Kaydol</h1>
                    {!errorMessage && <p className='text-zinc-400 mt-4'>
                        Büyük küçük harflere dikkat ederek doğru bilgileri giriniz!
                    </p>}
                    {
                        errorMessage &&
                        <p className='text-red-500 mt-4'>{errorMessage}</p>
                    }
                    <form className='mt-4 flex flex-col gap-4' onSubmit={onSubmit}>
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
                        <button
                            onClick={() => router.push('/giris-yap')}
                            className='ml-2 text-purple-400 hover:text-purple-300'
                        >
                            Giriş Yap
                        </button>
                    </div>

                </div>
            </div>
        </Layout >
    )
}
