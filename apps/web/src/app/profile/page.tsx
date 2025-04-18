"use client";

import { getUserQueryOptions } from "@/features-shared/user/api/getUserQueryOptions";
import { TopNavBar } from "@/features-shared/top-nav-bar/TopNavBar";
import { PageBody } from "@/layouts/page-layout/PageBody";
import { PageLayout } from "@/layouts/page-layout/PageLayout";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function Profile() {
  const { data } = useSuspenseQuery(getUserQueryOptions());

  return (
    <PageLayout>
      <TopNavBar />
      <PageBody>{JSON.stringify(data)}</PageBody>
    </PageLayout>
  );
}
