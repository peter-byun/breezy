import ReactQueryProvider from "@/layouts/library-provider/ReactQueryProvider";
import { Theme } from "@radix-ui/themes";
import { Suspense } from "@suspensive/react";
import { OverlayProvider } from "@toss/use-overlay";
import { PropsWithChildren } from "react";

export const TestPageLoader = ({ children }: PropsWithChildren) => {
  return (
    <Theme>
      <OverlayProvider>
        <ReactQueryProvider>
          <Suspense fallback={<p data-testid="page-loader">loading</p>}>
            {children}
          </Suspense>
        </ReactQueryProvider>
      </OverlayProvider>
    </Theme>
  );
};
