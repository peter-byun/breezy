import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - Breezy",
  description: "Mange your profile",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
