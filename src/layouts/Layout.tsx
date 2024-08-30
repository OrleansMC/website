import React, { HTMLProps } from "react";

import Navbar from "../components/common/Navbar";
import Footer from "@/components/common/Footer";
import Head from "next/head";
import { User } from "@/lib/server/auth/AuthManager";
import ProfileLayout from "./ProfileLayout";

type LayoutProps = {
  title: string;
  description: string;
  ogDescription: string;
  user: User | null;
  profile?: boolean;
} & HTMLProps<HTMLDivElement>;

export default function Layout({ title, description, ogDescription, children, user, profile }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="og:description" property="og:description" content={ogDescription} />
      </Head>
      <Navbar user={user} />
      <main className="container">{
        profile && user ? <ProfileLayout user={user}>
          {children}
        </ProfileLayout> : children
      }</main>
      <Footer />
    </>
  );
}