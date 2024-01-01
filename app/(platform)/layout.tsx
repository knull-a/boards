import React from "react";
import { WithChildren } from "../types";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/query-provider";

export default function PlatformLayout({ children }: WithChildren) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
}
