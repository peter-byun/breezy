import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Cards - Breezy",
  description: "Manage your cards",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
