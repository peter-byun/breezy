import { PlusIcon } from "@radix-ui/react-icons";
import { Button, ButtonProps } from "@radix-ui/themes";

export const AddCardButton = ({ onClick }: ButtonProps) => {
  return (
    <Button onClick={onClick} data-testid="add-card-button">
      <PlusIcon width="18" height="18" />
      Add a Card
    </Button>
  );
};
