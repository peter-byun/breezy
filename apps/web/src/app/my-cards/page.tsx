"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import VirtualList from "react-tiny-virtual-list";
import styles from "./my-cards.module.css";

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
import { PageLayout } from "@/layouts/page-layout/PageLayout";
import { TopNavBar } from "@/layouts/nav-bar/TopNavBar";
import { useCard } from "@/features/card/useCard";
import { Card } from "@/features/card/api/type";

export default function MyCards() {
  const { cardsToShow } = useCard();
  const [sortedCards, setSortedCards] = useState<Card[]>(cardsToShow);

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
    sortedCards.findIndex((card) => card.id === id);
  const activeIndex = activeId != null ? getIndex(activeId) : -1;

  return (
    <PageLayout>
      <TopNavBar />
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
              setSortedCards((items) =>
                arrayMove(items, activeIndex, overIndex)
              );
            }
          }

          setActiveId(null);
        }}
        onDragCancel={() => setActiveId(null)}
        modifiers={modifiers}
      >
        <Wrapper center={true}>
          <SortableContext items={sortedCards} strategy={strategy}>
            <VirtualList
              width={300}
              height={800}
              itemCount={sortedCards.length}
              itemSize={64}
              stickyIndices={
                activeId != null
                  ? [sortedCards.findIndex((sc) => sc.id === activeId)]
                  : undefined
              }
              renderItem={({ index, style }) => {
                const id = sortedCards[index].id;

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
                    renderItem={() => <>{sortedCards[index]?.title}</>}
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
                  value={sortedCards[activeIndex].content}
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
                  renderItem={() => <>{sortedCards[activeIndex]?.title}</>}
                />
              ) : null}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </PageLayout>
  );
}
