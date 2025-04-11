import { useOpenAlert } from "@/ui-components/alert/useOpenAlert";
import { useDialog } from "@/ui-components/dialog/useDialog";
import { AddCardDialog } from "./AddCardDialog";
import { Alert } from "@/ui-components/alert/Alert";
import { useMutateCard } from "@/features/card/useMutateCards";

export const useAddCardModal = () => {
  const { createCard } = useMutateCard();

  const openAlert = useOpenAlert();

  const addCardOverlay = useDialog();
  const addCard = () => {
    addCardOverlay.open(({ isOpen }) => (
      <AddCardDialog
        open={isOpen}
        setOpen={addCardOverlay.setOpen}
        onSubmit={(card) => {
          try {
            createCard(card);
          } catch {
            openAlert((props) => (
              <Alert
                {...props}
                title="Sorry"
                description="An error occurred while creating a card 😢"
                confirmLabel="Okay"
              />
            ));
          }
        }}
      />
    ));
  };

  return addCard;
};
