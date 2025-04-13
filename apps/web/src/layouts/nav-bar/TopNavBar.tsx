"use client";

import { TopNavBarItem } from "./TopNavBarItem";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TopNavBarLayout } from "./TopNavBarLayout";

const links = [
  {
    href: "/play",
    title: "Play",
  },
  {
    href: "/my-cards",
    title: "My Cards",
  },
];

export const TopNavBar = () => {
  const currentPathname = usePathname();

  const isLinkSelected = (pathname: string) => {
    return currentPathname === pathname;
  };

  return (
    <TopNavBarLayout>
      {links.map((link) => (
        <TopNavBarItem key={link.href} selected={isLinkSelected(link.href)}>
          <Link href={link.href}>{link.title}</Link>
        </TopNavBarItem>
      ))}
    </TopNavBarLayout>
  );
};
