import { Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export const ItemLayout = ({ children }: PropsWithChildren) => (
  <Flex width={"100%"} direction={"row"} justify={"between"}>
    {children}
  </Flex>
);
