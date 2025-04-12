import { css } from "@emotion/react";
import { Flex, Heading, Text } from "@radix-ui/themes";

export const OnboardingStep2 = () => {
  return (
    <Flex
      direction={"column"}
      align={"center"}
      justify={"start"}
      css={css`
        background-color: #3efd5131;

        position: absolute;
        top: 50%;
        left: 50%;

        width: 50%;
        height: 80%;

        padding: 20px;

        border-radius: 12px;
        border: 1px dotted #3efd51af;
        transform: translate(0, -50%);
      `}
      gap={"2"}
    >
      <Heading>
        <Text color="blue">Step 2 of 3:</Text> Great job! Now try dragging the
        card to the right!
      </Heading>
      <Text size={"5"}>
        {"It will be moved back to the bottom of the deck ↺"}
      </Text>
    </Flex>
  );
};
