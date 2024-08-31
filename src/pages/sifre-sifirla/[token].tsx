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

ResetPasswordTokenPage.getLayout = function getLayout(page: React.ReactNode, pageProps: PageProps) {
    return (
        <Layout
            title="OrleansMC - Şifre Sıfırla"
            description="OrleansMC sunucusundaki şifrenizi sıfırlayın."
            ogDescription="OrleansMC sunucusundaki şifrenizi sıfırlayın."
            user={pageProps.user}
        >
            {page}
        </Layout>
    )
}

export default function ResetPasswordTokenPage(props: PageProps & { token: string }) {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [successMessage, setSuccessMessage] = React.useState<string>('');
    const [submitting, setSubmitting] = React.useState<boolean>(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (submitting) {
            return;
        }

        const password = (e.currentTarget.querySelector('#password') as HTMLInputElement).value;
        const passwordAgain = (e.currentTarget.querySelector('#password-again') as HTMLInputElement).value;

        if (!password || !passwordAgain) {
            setErrorMessage('Tüm alanları doldurun.');
            return;
        }

        try {
            Util.validatePassword(password);
        } catch (error) {
            setErrorMessage((error as Error).message);
            return;
        }

        if (password !== passwordAgain) {
            setErrorMessage('Şifreler uyuşmuyor.');
            return;
        }
        setSubmitting(true);


        try {
            await axios.post(`/api/auth/reset-password/${props.token}`, {
                newPassword: password
            });

            setErrorMessage('');
            setSuccessMessage('Şifreniz başarıyla değiştirildi.');
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
                    <h1 className='text-4xl font-semibold'>Şifreni Sıfırla</h1>
                    {
                        submitting &&
                        <p className='text-zinc-400 mt-4'>İşlem yapılıyor...</p>
                    }
                    {!errorMessage && !submitting && !successMessage && <p className='text-zinc-400 mt-4'>
                        Yeni şifrenizi belirleyin.
                    </p>}
                    {
                        errorMessage && !successMessage && !submitting &&
                        <p className='text-red-500 mt-4'>{errorMessage}</p>
                    }
                    {
                        successMessage && !errorMessage && !submitting &&
                        <p className='text-green-500 mt-4'>{successMessage}</p>
                    }
                    <form className='mt-4 flex flex-col gap-4' onSubmit={onSubmit}>
                        <Input
                            id='password'
                            type="password"
                            placeholder="Yeni Şifre"
                        />
                        <Input
                            id='password-again'
                            type="password"
                            placeholder="Yeni Şifre Tekrar"
                        />
                        <button
                            type="submit"
                            className='p-4 bg-purple-500 text-zinc-200 rounded-lg hover:bg-purple-400 duration-300'
                        >
                            Şifremi Değiştir
                        </button>
                    </form>
                    <div className='mt-6'>
                        <span className='text-zinc-400'>Hesabın yok mu?</span>
                        <Link
                            href={'/kaydol'}
                            className='ml-2 text-purple-400 hover:text-purple-300'
                        >
                            Kaydol
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export const getServerSideProps = (async (ctx) => {
    const token = ctx.params?.token as string;
    if (!token || !await AuthManager.getInstance().validateResetPasswordToken(token)) {
        return {
            redirect: {
                destination: "/sifre-sifirla",
                permanent: false
            }
        }
    }
    return {
        props: {
            user: await AuthManager.getInstance().getUserFromContext(ctx),
            token
        }
    }
}) satisfies GetServerSideProps<{ user: User | null }>
