"use client";

import { Flex, Spinner, Text } from "@radix-ui/themes";

export const AppLoadingIndicator = () => {
  return (
    <Flex
      height={"100%"}
      direction={"column"}
      align={"center"}
      justify={"center"}
    >
      <Spinner size={"3"} />
      <Text>Loading the app for you... please hold on!</Text>
    </Flex>
  );
};
