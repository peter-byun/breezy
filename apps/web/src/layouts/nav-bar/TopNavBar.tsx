"use client";
import styled from "@emotion/styled";
import { TopNavBarItem } from "./TopNavBarItem";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <StyledTopNavBar>
      {links.map((link) => (
        <TopNavBarItem key={link.href} selected={isLinkSelected(link.href)}>
          <Link href={link.href}>{link.title}</Link>
        </TopNavBarItem>
      ))}
    </StyledTopNavBar>
  );
};

const StyledTopNavBar = styled.nav`
  top: 0px;
  left: 0px;
  width: 100%;
  height: fit-content;
  padding: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;

  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;
