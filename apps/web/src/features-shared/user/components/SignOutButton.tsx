import { css } from "@emotion/react";
import { Button, ButtonProps } from "@radix-ui/themes";

export const SignOutButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      color="iris"
      variant="outline"
      css={css`
        cursor: pointer;
      `}
    >
      Sign out
    </Button>
  );
};
