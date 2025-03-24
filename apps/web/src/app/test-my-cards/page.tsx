"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import VirtualList from "react-tiny-virtual-list";
import styles from "./test-my-cards.module.css";

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
import { Wrapper } from "@/features/dnd/components/Wrapper";
import {
  SortableItem,
  SortableProps,
} from "@/features/dnd/components/Sortable";
import { Item } from "@/features/dnd/components/Item";
import { createRange } from "@/features/dnd/utilities";

export default function Sortable() {
  const {
    adjustScale = false,
    strategy = verticalListSortingStrategy,
    itemCount = 100,
    handle = false,
    getItemStyles = () => ({}),
    modifiers,
  }: SortableProps = {};

  const [items, setItems] = useState(() =>
    createRange<UniqueIdentifier>(itemCount, (index) => `${index + 1}`)
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const getIndex = (id: UniqueIdentifier) => items.indexOf(id);
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
            setItems((items) => arrayMove(items, activeIndex, overIndex));
          }
        }

        setActiveId(null);
      }}
      onDragCancel={() => setActiveId(null)}
      modifiers={modifiers}
    >
      <Wrapper center>
        <SortableContext items={items} strategy={strategy}>
          <VirtualList
            width={500}
            height={600}
            itemCount={items.length}
            itemSize={64}
            stickyIndices={
              activeId != null ? [items.indexOf(activeId)] : undefined
            }
            renderItem={({ index, style }) => {
              const id = items[index];

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
                value={items[activeIndex]}
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
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}
