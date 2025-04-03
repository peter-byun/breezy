"use client";

import { PageLayout } from "@/layouts/page-layout/PageLayout";
import { TopNavBar } from "@/layouts/nav-bar/TopNavBar";
import { ManageableCardList } from "./components/ManageableCardList/ManageableCardList";
import { AddCardRoot } from "./components/AddCard/AddCardRoot";
import { EditCardDialog } from "./components/EditCard/EditCardDialog";
import { useCard } from "@/features/card/useCard";
import { useOverlay } from "@toss/use-overlay";

export default function MyCards() {
  const { editCard } = useCard();

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

  return (
    <PageLayout>
      <TopNavBar />
      <AddCardRoot />
      {/* TODO: handle CRUD operations here, with event handlers. to transparently
      show the logic, modals should be controlled by useOverlay hooks. */}
      <ManageableCardList onEditClick={handleEditClick} />
    </PageLayout>
  );
}
