import { css } from "@emotion/react";
import { Checkbox, Flex, Text, CheckboxProps } from "@radix-ui/themes";

export type CheckedState = CheckboxProps["checked"];

export const CardVisibilityCheckbox = ({
  checked,
  onCheckedChange,
}: CheckboxProps) => {
  return (
    <Text as="label" size="2">
      <Flex gap="2" direction={"row"} align={"center"}>
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          css={css`
            cursor: pointer;
          `}
          color="purple"
        />
        <Text color="purple">{checked ? "Visible" : "Hidden"}</Text>
      </Flex>
    </Text>
  );
};
