import { Card } from "@/features/card/api/type";
import { useDialog } from "@/ui-components/dialog/useDialog";
import { EditCardDialog } from "./EditCardDialog";
import { useOpenAlert } from "@/ui-components/alert/useOpenAlert";
import { Alert } from "@/ui-components/alert/Alert";
import { useMutateCard } from "@/features/card/useMutateCards";

export const useEditCardModal = () => {
  const cardMutator = useMutateCard();

  const editCardOverlay = useDialog();
  const openAlert = useOpenAlert();

  const editCard = (card: Card) => {
    editCardOverlay.open(({ isOpen }) => (
      <EditCardDialog
        currentCard={card}
        open={isOpen}
        setOpen={editCardOverlay.setOpen}
        onSubmit={(updatedCard) => {
          try {
            cardMutator.editCard(card.id, updatedCard);
          } catch {
            openAlert((props) => (
              <Alert
                {...props}
                title="Sorry"
                description="An error occurred while updating the card 😢"
                confirmLabel="Okay"
              />
            ));
          }
        }}
      />
    ));
  };

  return editCard;
};
