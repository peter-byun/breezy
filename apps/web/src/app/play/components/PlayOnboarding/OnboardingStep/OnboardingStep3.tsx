import { css } from "@emotion/react";
import { Heading, Text } from "@radix-ui/themes";

export const OnboardingStep3 = () => {
  return (
    <div
      css={css`
        background-color: #6fabff;

        position: absolute;
        top: 90px;
        left: 50%;
        width: 500px;
        padding: 20px;

        border-radius: 12px;

        transform: translate(-50%, 0);
      `}
    >
      <Heading>
        <Text color="blue">Last one!</Text> Touch the card! 👇🏻
      </Heading>
      <Text size={"5"}>{"You can check the content of it"}</Text>
    </div>
  );
};
