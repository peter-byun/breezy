"use client";

import { MouseEventHandler, PropsWithChildren, useState } from "react";
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
import { Flex, IconButton, Text } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import { css } from "@emotion/react";
import { EditCardDialog } from "../EditCard/EditCardDialog";

export const ManageableCardList = () => {
  const { cards, setCards, editCard, deleteCard } = useCard();
  // TODO: update origin cards data when cards are sorted

  const {
    adjustScale = false,
    strategy = verticalListSortingStrategy,
    handle = false,
    getItemStyles = () => ({}),
    modifiers,
  }: SortableProps = {};

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 100, tolerance: 10 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const getIndex = (id: UniqueIdentifier) =>
    cards.findIndex((card) => card.id === id);
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
            setCards((items) => arrayMove(items, activeIndex, overIndex));
          }
        }

        setActiveId(null);
      }}
      onDragCancel={() => setActiveId(null)}
      modifiers={modifiers}
    >
      <Wrapper center={true}>
        <SortableContext items={cards} strategy={strategy}>
          <VirtualList
            width={500}
            height={800}
            itemCount={cards.length}
            itemSize={64}
            stickyIndices={
              activeId != null
                ? [cards.findIndex((card) => card.id === activeId)]
                : undefined
            }
            renderItem={({ index, style }) => {
              const id = cards[index].id;

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
                  renderItem={() => (
                    <ItemLayout>
                      <Text>{cards[index]?.title}</Text>
                      <Flex direction={"row"} gap={"5px"}>
                        <EditCardDialog
                          onSubmit={(card) => {
                            editCard(id, card);
                          }}
                        />
                        <DeleteCardButton
                          onClick={() => {
                            deleteCard(id);
                          }}
                        />
                      </Flex>
                    </ItemLayout>
                  )}
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
                value={cards[activeIndex].content}
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
                renderItem={() => (
                  <ItemLayout>
                    <Text>{cards[activeIndex]?.title}</Text>
                  </ItemLayout>
                )}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
};

const ItemLayout = ({ children }: PropsWithChildren) => (
  <Flex width={"100%"} direction={"row"} justify={"between"}>
    {children}
  </Flex>
);
const DeleteCardButton = ({
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <IconButton
      onClick={(e) => {
        console.log("click");
        e.stopPropagation();
        onClick?.(e);
      }}
      color="red"
      variant="outline"
      onMouseOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      css={css`
        cursor: pointer;
      `}
    >
      <TrashIcon width="18" height="18" color="red" />
    </IconButton>
  );
};
