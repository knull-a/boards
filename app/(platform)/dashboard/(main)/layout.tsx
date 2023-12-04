"use client";

import { WithChildren } from "@/app/types";
import React from "react";
import Sidebar from "../_components/sidebar";
import { usePathTitle } from "@/hooks/use-path-title";
import { Separator } from "@/components/ui/separator";

export default function MainLayout({ children }: WithChildren) {
  const { title } = usePathTitle();
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <div className="flex gap-x-7">
        <div className="w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div>
        <div>
          <div className="mb-2">
            <h2 className="font-bold text-3xl mb-2">{title}</h2>
            <Separator />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </main>
  );
}
