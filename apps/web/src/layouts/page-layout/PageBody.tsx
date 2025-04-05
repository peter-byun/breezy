import { css } from "@emotion/react";
import { PropsWithChildren } from "react";

export const PageBody = ({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) => {
  return (
    <section
      css={css`
        position: relative;
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      `}
      className={className}
    >
      {children}
    </section>
  );
};
