"use client";

import { useEffect, useState } from "react";
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
import {
  SortableItem,
  SortableProps,
} from "@/ui-components/dnd/components/Sortable";
import { Item } from "@/ui-components/dnd/components/Item";
import { useCard } from "@/features/card/useCard";
import { Card } from "@/features/card/api/type";

const filterMemorizedCards = (cards: Card[]) =>
  cards.filter((card) => !card.memorized);

export const ManageableCardList = () => {
  const { cards } = useCard();
  // TODO: update origin cards data when cards are sorted

  const [cardsToShow, setCardsToShow] = useState(filterMemorizedCards(cards));
  useEffect(() => {
    setCardsToShow(filterMemorizedCards(cards));
  }, [cards]);

  const {
    adjustScale = false,
    strategy = verticalListSortingStrategy,
    handle = false,
    getItemStyles = () => ({}),
    modifiers,
  }: SortableProps = {};

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const getIndex = (id: UniqueIdentifier) =>
    cardsToShow.findIndex((card) => card.id === id);
  const activeIndex = activeId != null ? getIndex(activeId) : -1;

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
          if (activeIndex !== overIndex) {
            setCardsToShow((items) => arrayMove(items, activeIndex, overIndex));
          }
        }

        setActiveId(null);
      }}
      onDragCancel={() => setActiveId(null)}
      modifiers={modifiers}
    >
      <Wrapper center={true}>
        <SortableContext items={cardsToShow} strategy={strategy}>
          <VirtualList
            width={300}
            height={800}
            itemCount={cardsToShow.length}
            itemSize={64}
            stickyIndices={
              activeId != null
                ? [cardsToShow.findIndex((card) => card.id === activeId)]
                : undefined
            }
            renderItem={({ index, style }) => {
              const id = cardsToShow[index].id;

              return (
                <SortableItem
                  key={id}
                  id={id}
                  index={index}
                  handle={handle}
                  wrapperStyle={() => ({
                    ...style,
                    padding: 5,
                  })}
                  style={getItemStyles}
                  useDragOverlay
                  renderItem={() => <>{cardsToShow[index]?.title}</>}
                />
              );
            }}
            className={styles.VirtualList}
          />
        </SortableContext>
      </Wrapper>
      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay adjustScale={adjustScale}>
            {activeId != null ? (
              <Item
                value={cardsToShow[activeIndex].content}
                handle={handle}
                style={getItemStyles({
                  id: activeId,
                  index: activeIndex,
                  isDragging: true,
                  isSorting: true,
                  overIndex: -1,
                  isDragOverlay: true,
                })}
                wrapperStyle={{
                  padding: 5,
                }}
                dragOverlay
                renderItem={() => <>{cardsToShow[activeIndex]?.title}</>}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
};
