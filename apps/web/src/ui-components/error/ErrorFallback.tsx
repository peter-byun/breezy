import { css } from "@emotion/react";
import { Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export const ErrorFallback = ({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) => {
  return (
    <Flex
      direction={"column"}
      align={"center"}
      gap={"2"}
      css={css`
        background-color: #ff2f2f39;
        padding: 15px;
        border-radius: 8px;
      `}
      className={className}
    >
      {children}
    </Flex>
  );
};
