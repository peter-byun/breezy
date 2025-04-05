import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Button, ButtonProps } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StartOverButton = ({ onClick, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      onClick={onClick}
      css={css`
        padding: 20px;
        font-size: 20px;
      `}
    >
      🎉 Congrats! Wanna start over?
    </Button>
  );
};

const Count = ({ children }: PropsWithChildren) => {
  return <h2>{children}</h2>;
};

export const CardStackProgress = {
  Layout,
  StartOverButton,
  Count,
} as const;
