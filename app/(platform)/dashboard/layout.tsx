import React from "react";
import { WithChildren } from "@/app/types";
import Navbar from "./_components/navbar";
import "./globals.css";

export default function DashboardLayout({ children }: WithChildren) {
  return (
    <div className="h-full">
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
