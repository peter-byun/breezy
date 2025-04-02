import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { HTMLAttributes, MouseEventHandler } from "react";

type Props = HTMLAttributes<HTMLButtonElement> & {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const SubmitButton = ({ onClick, children }: Props) => {
  return (
    <Button onClick={onClick} type="submit">
      <PlusIcon width="18" height="18" />
      {children}
    </Button>
  );
};
