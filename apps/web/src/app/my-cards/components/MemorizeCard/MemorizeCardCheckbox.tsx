import { css } from "@emotion/react";
import { Checkbox, Flex, Text } from "@radix-ui/themes";
import { MouseEventHandler } from "react";

export const MemorizeCardCheckbox = (
  {
    // onClick,
  }: {
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }
) => {
  return (
    <Text as="label" size="2">
      <Flex gap="2" direction={"row"} align={"center"}>
        <Checkbox
          defaultChecked
          css={css`
            cursor: pointer;
          `}
          color="purple"
        />
        <Text color="purple">Visible</Text>
      </Flex>
    </Text>
  );
};
