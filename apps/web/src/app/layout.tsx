"use client";
import { HtmlLayout } from "@/layouts/HtmlLayout";
import "./globals.css";

import ReactQueryProvider from "@/layouts/library-provider/ReactQueryProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HtmlLayout>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </HtmlLayout>
  );
}
