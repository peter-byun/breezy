import { ErrorFallback } from "@/ui-components/error/ErrorFallback";
import { Heading, Text } from "@radix-ui/themes";

export const CardStackErrorFallback = () => {
  return (
    <ErrorFallback>
      <Heading>{"We're Sorry"}</Heading>
      <Text align={"center"}>
        An error occurred while loading the cards.
        <br />
        We will fix it as soon as possible.
      </Text>
    </ErrorFallback>
  );
};
