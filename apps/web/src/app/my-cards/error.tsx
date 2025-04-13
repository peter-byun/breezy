"use client";

import { PageErrorFallback } from "@/ui-components/error/PageErrorFallback";
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

  return <PageErrorFallback />;
}
