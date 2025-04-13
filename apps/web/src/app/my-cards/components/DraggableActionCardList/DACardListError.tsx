import { ErrorFallback } from "@/ui-components/error/ErrorFallback";
import { css } from "@emotion/react";
import { Button, Heading, Text } from "@radix-ui/themes";

export const DACardListError = ({ onReset }: { onReset: () => void }) => {
  return (
    <ErrorFallback css={verticalCenterStyle}>
      <Heading>{"We're Sorry"}</Heading>
      <Text align={"center"}>
        The card list is unavailable this time.
        <br />
        We will fix it as soon as possible.
      </Text>
      <Button onClick={onReset}>Reload</Button>
    </ErrorFallback>
  );
};

const verticalCenterStyle = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;
