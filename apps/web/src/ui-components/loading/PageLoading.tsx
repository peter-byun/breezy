"use client";

import { PageLayout } from "@/layouts/page-layout/PageLayout";
import { css } from "@emotion/react";
import { ReactNode } from "react";
import { AppLoadingIndicator } from "./AppLoadingIndicator";
import { TopNavBarLayout } from "@/features-shared/top-nav-bar/TopNavBarLayout";

export function PageLoading({
  loadingIndicator,
}: {
  loadingIndicator?: ReactNode;
}) {
  return (
    <PageLayout
      css={css`
        gap: 20px;
      `}
    >
      <TopNavBarLayout />
      {loadingIndicator ? loadingIndicator : <AppLoadingIndicator />}
    </PageLayout>
  );
}
