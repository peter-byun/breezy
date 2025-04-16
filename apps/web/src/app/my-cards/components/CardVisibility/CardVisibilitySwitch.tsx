import { css } from "@emotion/react";
import { Flex, Text, SwitchProps, Switch } from "@radix-ui/themes";

export type CheckedState = SwitchProps["checked"];

export const CardVisibilitySwitch = ({
  checked,
  onCheckedChange,
}: SwitchProps) => {
  return (
    <Text as="label" size="2">
      <Flex gap="2" direction={"row"} align={"center"}>
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          css={css`
            cursor: pointer;
          `}
          color="purple"
          size={"1"}
          data-testid="card-visibility-switch"
        />

        <Text color="purple">{checked ? "Visible" : "Hidden"}</Text>
      </Flex>
    </Text>
  );
};
