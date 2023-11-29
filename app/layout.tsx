import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WithChildren } from "./types";
import { siteConfig } from "@/config/site";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import { ReduxProvider } from "@/lib/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
      <ReduxProvider>
        <body className={inter.className}>{children}</body>
      </ReduxProvider>
    </html>
  );
}
