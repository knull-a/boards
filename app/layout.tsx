import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WithChildren } from "./types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boards.",
  description: "Streamline Your Workflow, Master Your Time",
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

export default function RootLayout({ children }: WithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
