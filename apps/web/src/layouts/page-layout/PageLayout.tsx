import { css } from "@emotion/react";
import { PropsWithChildren } from "react";

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <main
      css={css`
        width: 100%;
        height: 100%;

        gap: 20px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      `}
    >
      {children}
    </main>
  );
};
