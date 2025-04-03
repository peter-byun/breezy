"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import VirtualList from "react-tiny-virtual-list";
import styles from "./manageable-card-list.module.css";

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
import { SortableItem } from "@/ui-components/dnd/components/Sortable";
import { Item } from "@/ui-components/dnd/components/Item";

import { Flex, Text } from "@radix-ui/themes";

import { DeleteCardButton } from "../DeleteCard/DeleteCardButton";
import { ItemLayout } from "@/ui-components/dnd/components/Item/ItemLayout";
import { EditCardButton } from "../EditCard/EditCardButton";
import { Card } from "@/features/card/api/type";

interface Props {
  cards: Card[];
  onCardsReorder: (cards: Card[]) => void;
  onEditClick: (cardId: string) => void;
  onDeleteClick: (cardId: string) => void;
}

const DRAG_TRIGGER_MOUSEDOWN_MS = 100;
const DRAG_ABORT_MOVEMENT_PX = 10;
const adjustScale = false;
const strategy = verticalListSortingStrategy;

export const ManageableCardList = ({
  cards,
  onCardsReorder,
  onEditClick,
  onDeleteClick,
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
        <SortableContext items={cards} strategy={strategy}>
          <VirtualList
            itemCount={cards.length}
            stickyIndices={activeItemIndices}
            renderItem={({ index, style }) => {
              const id = cards[index].id;
              return (
                <SortableItem
                  key={id}
                  id={id}
                  index={index}
                  renderItem={() => (
                    <ItemLayout>
                      <Text>{cards[index]?.title}</Text>
                      <Flex direction={"row"} gap={"5px"}>
                        {/* TODO: Replace these with simple buttons with click handlers, and pass the events up to the root. */}
                        <EditCardButton
                          onClick={() => {
                            onEditClick(id);
                          }}
                        />
                        <DeleteCardButton
                          onClick={() => {
                            onDeleteClick(id);
                          }}
                        />
                      </Flex>
                    </ItemLayout>
                  )}
                  wrapperStyle={() => ({
                    ...style,
                    padding: 5,
                  })}
                />
              );
            }}
            width={500}
            height={800}
            itemSize={64}
            className={styles.VirtualList}
          />
        </SortableContext>
      </Wrapper>
      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay adjustScale={adjustScale}>
            {activeId != null ? (
              <Item
                value={cards[activeItemIndex].content}
                renderItem={() => (
                  <ItemLayout>
                    <Text>{cards[activeItemIndex]?.title}</Text>
                  </ItemLayout>
                )}
                wrapperStyle={{
                  padding: 5,
                }}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
};
