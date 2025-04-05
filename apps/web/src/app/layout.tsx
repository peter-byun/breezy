"use client";
import "./globals.css";
import "@radix-ui/themes/styles.css";

import { Geist, Geist_Mono } from "next/font/google";
import { Theme } from "@radix-ui/themes";

import { OverlayProvider } from "@toss/use-overlay";
import ReactQueryProvider from "@/layouts/library-provider/ReactQueryProvider";
import { css } from "@emotion/react";

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
        <Theme
          css={css`
            height: 100%;
          `}
        >
          <OverlayProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </OverlayProvider>
        </Theme>
      </body>
    </html>
  );
}
