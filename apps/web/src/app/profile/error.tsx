"use client";

import { PageErrorFallback } from "@/ui-components/error/PageErrorFallback";
import { Flex, Heading } from "@radix-ui/themes";
import { captureException } from "@sentry/nextjs";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <PageErrorFallback>
      <Flex
        width={"100%"}
        height={"100%"}
        direction={"column"}
        align={"center"}
        justify={"center"}
        gap={"4"}
      >
        <Heading size={"4"} color="red">
          Please sign in to see your profile!
        </Heading>
      </Flex>
    </PageErrorFallback>
  );
}
