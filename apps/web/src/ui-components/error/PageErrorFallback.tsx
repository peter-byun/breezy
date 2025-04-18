import { TopNavBar } from "@/features-shared/top-nav-bar/TopNavBar";
import { PageLayout } from "@/layouts/page-layout/PageLayout";
import { css } from "@emotion/react";
import { Flex } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes/components/callout";
import Link from "next/link";
import { PropsWithChildren } from "react";

export const PageErrorFallback = ({ children }: PropsWithChildren) => {
  return (
    <PageLayout>
      <TopNavBar />
      {children ? (
        children
      ) : (
        <Flex
          width={"100%"}
          height={"100%"}
          direction={"column"}
          align={"center"}
          justify={"center"}
          gap={"4"}
        >
          <h2>Something went wrong</h2>
          <Text align={"center"}>
            If the error persists even after refreshing the website, <br />
            please contact us via{" "}
            <Link
              href="mailto:pixelperfectprogramming@gmail.com"
              css={css`
                color: #2471ff;
              `}
            >
              pixelperfectprogramming@gmail.com
            </Link>
            .
            <br />
            We will fix it as soon as possible.
          </Text>
        </Flex>
      )}
    </PageLayout>
  );
};
