import { Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export const DndItemLayout = ({ children }: PropsWithChildren) => (
  <Flex width={"170px"} direction={"row"} justify={"between"}>
    {children}
  </Flex>
);
