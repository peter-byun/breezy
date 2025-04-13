"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <h2>{"We're Sorry"}</h2>
        Service is unavailable this time. <br />
        We will fix it as soon as possible.
      </body>
    </html>
  );
}
