import { css } from "@emotion/react";
import { Text } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export const FormErrorText = ({ children }: PropsWithChildren) => {
  return (
    <Text
      color="crimson"
      size={"1"}
      css={css`
        display: block;
        height: 1em;
      `}
    >
      {children}
    </Text>
  );
};
