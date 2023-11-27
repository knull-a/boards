import React, { ReactNode } from "react";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import { WithChildren } from "../types";

export default function LandingLayout({ children }: WithChildren) {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="pt-56 pb-20 px-4 bg-slate-100">{children}</main>
      <Footer />
    </div>
  );
}
