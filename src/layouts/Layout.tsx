import React, { HTMLProps } from "react";

import Navbar from "../components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function Layout({ children }: HTMLProps<HTMLDivElement>) {
  return (
    <div>
      <Navbar />
      <main className="container">{children}</main>
      <Footer />
    </div>
  );
}