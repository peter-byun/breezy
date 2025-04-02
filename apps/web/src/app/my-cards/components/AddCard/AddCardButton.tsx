import { Button } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import { MouseEventHandler } from "react";

export const AddCardButton = ({
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button onClick={onClick}>
      <PlusIcon width="18" height="18" />
      Add Card
    </Button>
  );
};
