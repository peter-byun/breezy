import { css } from "@emotion/react";
import { Flex, Heading, Text } from "@radix-ui/themes";

export const OnboardingStep2 = () => {
  return (
    <Flex
      direction={"column"}
      justify={"center"}
      css={css`
        background-color: #3efd5131;

        position: absolute;
        left: 50%;

        width: 50%;
        height: 80%;

        border-radius: 12px;
        border: 1px dotted #3efd51af;
      `}
    >
      <Heading>Try dragging the card to the right!</Heading>
      <Text size={"5"}>
        {"It will be moved back to the bottom of the deck ↺"}
      </Text>
    </Flex>
  );
};
