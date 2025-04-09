export async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
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
