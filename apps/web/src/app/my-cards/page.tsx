"use client";

import { PageLayout } from "@/layouts/page-layout/PageLayout";
import { TopNavBar } from "@/layouts/nav-bar/TopNavBar";
import { ManageableCardList } from "./components/ManageableCardList/ManageableCardList";
import { AddCardRoot } from "./components/AddCard/AddCardRoot";

export default function MyCards() {
  return (
    <PageLayout>
      <TopNavBar />
      <AddCardRoot />
      {/* TODO: handle CRUD operations here, with event handlers. to transparently
      show the logic, modals should be controlled by useOverlay hooks. */}
      <ManageableCardList />
    </PageLayout>
  );
}
