"use client";

import { PageLayout } from "@/layouts/page-layout/PageLayout";
import { TopNavBar } from "@/layouts/nav-bar/TopNavBar";
import { ManageableCardList } from "./components/ManageableCardList/ManageableCardList";
import { AddCardRoot } from "./components/AddCard/AddCardRoot";
import { EditCardDialog } from "./components/EditCard/EditCardDialog";
import { useCard } from "@/features/card/useCard";
import { useOverlay } from "@toss/use-overlay";
import { Card } from "@/features/card/api/type";

export default function MyCards() {
  const { cards, setCards, editCard, deleteCard } = useCard();

  const handleCardsReorder = (cards: Card[]) => {
    setCards(cards);
  };

  const overlay = useOverlay();
  const handleEditClick = (cardId: string) => {
    overlay.open(({ isOpen, close }) => (
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
      <AddCardRoot />
      <ManageableCardList
        cards={cards}
        onCardsReorder={handleCardsReorder}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </PageLayout>
  );
}
