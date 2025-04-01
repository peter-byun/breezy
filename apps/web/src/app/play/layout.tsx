import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Breezy",
  description: "A delightful flash card app",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
