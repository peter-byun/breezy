"use client";

import { TopNavBarItem } from "./TopNavBarItem";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TopNavBarLayout } from "./TopNavBarLayout";
import { Flex } from "@radix-ui/themes";
import { SignInButton } from "@/features-shared/user/components/SignInButton";
import { SignOutButton } from "@/features-shared/user/components/SignOutButton";
import { login } from "@/features-shared/user/login";
import { logout } from "@/features-shared/user/logout";
import { ProfileButton } from "@/features-shared/user/components/ProfileButton";
import { css } from "@emotion/react";
import { useUser } from "../user/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { getUserQueryOptions } from "../user/api/getUserQueryOptions";

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

  const user = useUser();

  const router = useRouter();

  const queryClient = useQueryClient();
  const handleLogin = async () => {
    const result = await login();
    if (result) {
      queryClient.invalidateQueries(getUserQueryOptions());
    }
  };

  const handleLogout = async () => {
    const result = await logout();

    if (result.succeeded) {
      router.push("/");
    }
  };

  return (
    <TopNavBarLayout>
      <Flex>
        {links.map((link) => (
          <TopNavBarItem key={link.href} selected={isLinkSelected(link.href)}>
            <Link href={link.href}>{link.title}</Link>
          </TopNavBarItem>
        ))}
      </Flex>
      <Flex
        css={css`
          position: absolute;
          right: 20px;
        `}
        align={"center"}
        justify={"center"}
        gap={"3"}
      >
        {user.isSignedIn ? (
          <SignOutButton onClick={handleLogout} />
        ) : (
          <SignInButton onClick={handleLogin} />
        )}
        <Link href={"/profile"}>
          <ProfileButton />
        </Link>
      </Flex>
    </TopNavBarLayout>
  );
};
