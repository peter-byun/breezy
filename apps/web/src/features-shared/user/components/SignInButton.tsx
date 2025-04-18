import { css } from "@emotion/react";
import { Button, ButtonProps } from "@radix-ui/themes";

export const SignInButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      color="iris"
      variant="outline"
      css={css`
        cursor: pointer;
      `}
    >
      Sign in
    </Button>
  );
};
