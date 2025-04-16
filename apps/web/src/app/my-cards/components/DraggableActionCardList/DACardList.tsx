"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import VirtualList from "react-tiny-virtual-list";
import styles from "./da-card-list.module.css";

import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { Card } from "@/features/card/api/type";
import { CheckedState } from "../CardVisibility/CardVisibilitySwitch";
import { DndItemStatic } from "./DndItemStatic";
import { DndListLayout } from "@/ui-components/dnd/DndList/DndListLayout";
import { DndItemDragging } from "./DndItemDragging";
import { isBrowser, isNotNil } from "es-toolkit";
import { getCardQueryOptions } from "@/features/card/api/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  onCardsReorder: OnCardsReorder;
  onEditClick: (cardId: Card) => void;
  onDeleteClick: (cardId: string) => void;
  OnVisibilitySwitchClick: OnVisibilitySwitchClick;
}
export type OnCardsReorder = (params: {
  id: string;
  toIdx: number;
  localCards: Card[];
}) => void;
export type OnVisibilitySwitchClick = (
  cardId: string,
  checked: CheckedState
) => void;

export const LIST_WIDTH = 800;
const LIST_HEIGHT = 1000;
export const ITEM_SIZE = 64;
const DRAG_TRIGGER_MOUSEDOWN_MS = 50;
const DRAG_ABORT_MOVEMENT_PX = 10;

export const DACardList = ({
  onCardsReorder,
  onEditClick,
  onDeleteClick,
  OnVisibilitySwitchClick,
}: Props) => {
  const { data: cards } = useSuspenseQuery(getCardQueryOptions);

  const [localCards, setLocalCards] = useState(cards);
  useEffect(() => {
    setLocalCards(cards);
  }, [cards]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: DRAG_TRIGGER_MOUSEDOWN_MS,
        tolerance: DRAG_ABORT_MOVEMENT_PX,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const activeItemIndex =
    activeId !== null ? getCardIndexById(localCards, activeId) : -1;

  const activeItemIndices =
    activeId !== null
      ? [localCards.findIndex((card) => card.id === activeId)]
      : undefined;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => {
        setActiveId(active.id);
      }}
      onDragEnd={({ over }) => {
        if (over) {
          const coveredItemIndex = getCardIndexById(localCards, over.id);
          if (activeItemIndex !== coveredItemIndex) {
            setLocalCards(
              arrayMove(localCards, activeItemIndex, coveredItemIndex)
            );

            const card = localCards[activeItemIndex];
            onCardsReorder({
              id: card.id,
              toIdx: coveredItemIndex,
              localCards,
            });
          }
        }
        setActiveId(null);
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <DndListLayout>
        <SortableContext
          items={localCards}
          strategy={verticalListSortingStrategy}
        >
          <VirtualList
            itemCount={localCards.length}
            stickyIndices={activeItemIndices}
            renderItem={({ index, style }) => {
              const card = localCards[index];
              return (
                <DndItemStatic
                  key={card.id}
                  id={card.id}
                  index={index}
                  wrapperStyle={style}
                  card={card}
                  onEditClick={onEditClick}
                  OnVisibilitySwitchClick={OnVisibilitySwitchClick}
                  onDeleteClick={onDeleteClick}
                  testid={"card-static"}
                />
              );
            }}
            width={LIST_WIDTH}
            height={LIST_HEIGHT}
            itemSize={ITEM_SIZE}
            className={styles.VirtualList}
          />
        </SortableContext>
      </DndListLayout>
      {isBrowser() &&
        createPortal(
          <DragOverlay adjustScale={false}>
            {isNotNil(activeId) && (
              <DndItemDragging title={cards[activeItemIndex]?.title} />
            )}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
};

function getCardIndexById(cards: Card[], id: UniqueIdentifier) {
  return cards.findIndex((card) => card.id === id);
}
