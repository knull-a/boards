import React from "react";
import { WithChildren } from "@/app/types";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./_components/navbar";

export default function DashboardLayout({ children }: WithChildren) {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  );
}
