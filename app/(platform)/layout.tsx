import React from "react";
import { WithChildren } from "../types";
import { ClerkProvider } from "@clerk/nextjs";

export default function PlatformLayout({ children }: WithChildren) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
