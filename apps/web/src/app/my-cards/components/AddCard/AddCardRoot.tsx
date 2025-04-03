import { useCard } from "@/features/card/useCard";
import { AddCardDialog } from "./AddCardDialog";

export const AddCardRoot = () => {
  const { createCard } = useCard();
  return (
    <AddCardDialog
      onSubmit={(card) => {
        createCard(card);
      }}
    />
  );
};
