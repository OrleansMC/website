import React, { HTMLProps } from "react";

import Navbar from "../components/common/Navbar";
import Footer from "@/components/common/Footer";
import Head from "next/head";

type LayoutProps = {
  title: string;
  description: string;
  ogDescription: string;
} & HTMLProps<HTMLDivElement>;

export default function Layout({ title, description, ogDescription, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="og:description" property="og:description" content={ogDescription} />
      </Head>
      <Navbar />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
}