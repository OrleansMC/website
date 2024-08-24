import React, { HTMLProps } from "react";

import Navbar from "../components/common/Navbar";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import { WebUser } from "@/lib/server/auth/AuthManager";

type LayoutProps = {
  title: string;
  description: string;
  ogDescription: string;
  user: WebUser | null;
} & HTMLProps<HTMLDivElement>;

export default function Layout({ title, description, ogDescription, children, user }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="og:description" property="og:description" content={ogDescription} />
      </Head>
      <Navbar user={user} />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
}