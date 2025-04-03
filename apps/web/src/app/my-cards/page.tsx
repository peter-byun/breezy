"use client";

import { PageLayout } from "@/layouts/page-layout/PageLayout";
import { TopNavBar } from "@/layouts/nav-bar/TopNavBar";
import { ManageableCardList } from "./components/ManageableCardList/ManageableCardList";
import { EditCardDialog } from "./components/EditCard/EditCardDialog";
import { useCard } from "@/features/card/useCard";
import { useOverlay } from "@toss/use-overlay";
import { Card } from "@/features/card/api/type";
import { AddCardButton } from "./components/AddCard/AddCardButton";
import { AddCardDialog } from "./components/AddCard/AddCardDialog";

export default function MyCards() {
  const { cards, setCards, createCard, editCard, deleteCard } = useCard();

  const handleCardsReorder = (cards: Card[]) => {
    setCards(cards);
  };

  const addCardOverlay = useOverlay();
  const handleAddCardClick = () => {
    addCardOverlay.open(({ isOpen, close }) => (
      <AddCardDialog
        open={isOpen}
        setOpen={(nextOpen) => {
          if (!nextOpen) {
            close();
          }
        }}
        onSubmit={(card) => {
          createCard(card);
        }}
      />
    ));
  };

  const editCardOverlay = useOverlay();
  const handleEditClick = (cardId: string) => {
    editCardOverlay.open(({ isOpen, close }) => (
      <EditCardDialog
        open={isOpen}
        setOpen={(nextOpen) => {
          if (!nextOpen) {
            close();
          }
        }}
        onSubmit={(card) => {
          editCard(cardId, card);
        }}
      />
    ));
  };

  const handleDeleteClick = (cardId: string) => {
    deleteCard(cardId);
  };

  return (
    <PageLayout>
      <TopNavBar />
      <AddCardButton onClick={handleAddCardClick} />
      <ManageableCardList
        cards={cards}
        onCardsReorder={handleCardsReorder}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </PageLayout>
  );
}
