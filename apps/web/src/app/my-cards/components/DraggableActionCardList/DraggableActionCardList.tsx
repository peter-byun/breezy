"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import VirtualList from "react-tiny-virtual-list";
import styles from "./draggable-action-card-list.module.css";

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
  arrayMove,
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Wrapper } from "@/ui-components/dnd/components/Wrapper";
import { Item } from "@/ui-components/dnd/components/Item";

import { Text } from "@radix-ui/themes";

import { ItemLayout } from "@/ui-components/dnd/components/Item/ItemLayout";
import { Card } from "@/features/card/api/type";
import { CheckedState } from "../CardVisibility/CardVisibilitySwitch";
import { SortableOptimized } from "./SortableOptimized";
interface Props {
  cards: Card[];
  onCardsReorder: (cards: Card[]) => void;
  onEditClick: (cardId: string) => void;
  onDeleteClick: (cardId: string) => void;
  OnVisibilitySwitchClick: OnVisibilitySwitchClick;
}
export type OnVisibilitySwitchClick = (
  cardId: string,
  checked: CheckedState
) => void;

const LIST_WIDTH = 800;
const LIST_HEIGHT = 1000;
const DRAG_TRIGGER_MOUSEDOWN_MS = 50;
const DRAG_ABORT_MOVEMENT_PX = 10;

export const DraggableActionCardList = ({
  cards,
  onCardsReorder,
  onEditClick,
  onDeleteClick,
  OnVisibilitySwitchClick,
}: Props) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
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

  const activeItemIndex = activeId != null ? getIndex(activeId) : -1;
  const activeItemIndices =
    activeId != null
      ? [cards.findIndex((card) => card.id === activeId)]
      : undefined;

  function getIndex(id: UniqueIdentifier) {
    return cards.findIndex((card) => card.id === id);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => {
        setActiveId(active.id);
      }}
      onDragEnd={({ over }) => {
        if (over) {
          const overIndex = getIndex(over.id);
          if (activeItemIndex !== overIndex) {
            onCardsReorder(arrayMove(cards, activeItemIndex, overIndex));
          }
        }
        setActiveId(null);
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <Wrapper center={true}>
        <SortableContext items={cards} strategy={verticalListSortingStrategy}>
          <VirtualList
            itemCount={cards.length}
            stickyIndices={activeItemIndices}
            renderItem={({ index, style }) => {
              const card = cards[index];
              return (
                <SortableOptimized
                  key={card.id}
                  id={card.id}
                  index={index}
                  wrapperStyle={style}
                  card={card}
                  onEditClick={onEditClick}
                  OnVisibilitySwitchClick={OnVisibilitySwitchClick}
                  onDeleteClick={onDeleteClick}
                />
              );
            }}
            width={LIST_WIDTH}
            height={LIST_HEIGHT}
            itemSize={64}
            className={styles.VirtualList}
          />
        </SortableContext>
      </Wrapper>
      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay adjustScale={false}>
            {activeId != null ? (
              <Item
                title={
                  <ItemLayout>
                    <Text>{cards[activeItemIndex]?.title}</Text>
                  </ItemLayout>
                }
                wrapperStyle={{
                  padding: 5,
                }}
                dragOverlay={true}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
};
