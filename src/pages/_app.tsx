import '@/styles/globals.scss';
import type { AppProps } from "next/app";
import Head from "next/head";

import { Inter } from "next/font/google";

const font = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--default-font'
});


import AOS from 'aos';
import 'aos/dist/aos.css';
import 'material-symbols/rounded.css';
import { useEffect, useState } from 'react';
import { PageProps } from '@/types';
import Loading from '@/components/common/Loading';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function App({ Component, pageProps }: PageProps & AppProps) {
  const [loading, setLoading] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);

    AOS.init({ duration: 1000, once: true });
    import('@lottiefiles/lottie-player');

    const handleStart = (url: string) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, []);


  //@ts-ignore
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <>
      <Head>
        <meta name="publisher" content="mustafacan.dev" />
        <meta name="author" content="mustafacan.dev" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="OrleansMC" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="OrleansMC - Minecraft Sunucusu" />
        <meta name="color-scheme" content="dark" />

        <link rel="shortcut icon" href="/_next/image?url=/uploads/icon_79e19a6c43.png&w=48&q=100"></link>
        <link rel="apple-touch-icon" href="/_next/image?url=/uploads/icon_79e19a6c43.png&w=512&q=100" sizes="512x512"></link>

        <meta name="twitter:card" property="twitter:card" content="summary" />
        <meta name="twitter:site" property="twitter:site" content="@orleansmc" />

        <meta name="og:type" property="og:type" content="website" />
        <meta name="og:image" property="og:image" content="/uploads/rounded_logo_b2d306763c.png" />
        <meta name="og:image:width" property="og:image:width" content="512" />
        <meta name="og:image:height" property="og:image:height" content="512" />
        <meta name="og:image:type" property="og:image:type" content="image/png" />
        <meta name="og:title" property="og:title" content="OrleansMC - Minecraft Sunucusu" />
        <meta name="og:site_name" property="og:site_name" content="OrleansMC" />
        <meta name="og:url" property="og:url" content="https://orleansmc.com/" />
      </Head>
      <GoogleAnalytics gaId='G-2YPEQ5L1HV' />
      <style jsx global>{`
      html {
        font-family: ${font.style.fontFamily};
        background: #010210;
      }
    `}</style>
      {loading != null && <Loading loading={loading} />}
      {getLayout(<Component {...pageProps} />, pageProps)}
    </>
  );
}