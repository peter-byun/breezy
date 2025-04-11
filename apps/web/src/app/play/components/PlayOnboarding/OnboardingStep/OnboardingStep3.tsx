import { css } from "@emotion/react";
import { Heading, Text } from "@radix-ui/themes";

export const OnboardingStep3 = () => {
  return (
    <div
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10%;
        background-color: #3b7bd4;
        z-index: 100;
      `}
    >
      <Heading>Touch the card!</Heading>
      <Text size={"5"}>{"You can check the content of it🧐"}</Text>
    </div>
  );
};
