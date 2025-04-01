"use client";
import "./globals.css";
import "@radix-ui/themes/styles.css";

import { Geist, Geist_Mono } from "next/font/google";
import { Theme } from "@radix-ui/themes";

import ReactQueryProvider from "@/layouts/library-provider/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Theme>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </Theme>
      </body>
    </html>
  );
}
