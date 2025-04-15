import { getEnvironment } from "@/env-var/getEnvironment";

export async function enableMocking() {
  if (!getEnvironment().isDevelopment) {
    return;
  }

  if (typeof window === "undefined") {
    const { server } = await import("./node");
    server.listen({
      onUnhandledRequest: "bypass",
    });
  } else {
    const { worker } = await import("./browser");
    worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}
