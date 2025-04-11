"use client";

import { Card } from "@/features/card/api/type";

import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { Flex, Text } from "@radix-ui/themes";
import { memo, useMemo } from "react";
import { ItemStyle } from "react-tiny-virtual-list";
import { CardVisibilitySwitch } from "../CardVisibility/CardVisibilitySwitch";
import { EditCardButton } from "../EditCard/EditCardButton";
import { DeleteCardButton } from "../DeleteCard/DeleteCardButton";
import { OnVisibilitySwitchClick } from "./DACardList";
import { DndItemLayout } from "@/ui-components/dnd/DnDItem/DndItemLayout";
import { DndItem } from "@/ui-components/dnd/DnDItem/DnDItem";

interface Props {
  id: UniqueIdentifier;
  index: number;
  wrapperStyle: ItemStyle;

  card: Card;
  onEditClick: (card: Card) => void;
  onDeleteClick: (cardId: string) => void;
  OnVisibilitySwitchClick: OnVisibilitySwitchClick;
}

const disabled = false;

export const DndItemStatic = memo(function Sortable({
  id,
  index,
  wrapperStyle,

  card,
  OnVisibilitySwitchClick,
  onEditClick,
  onDeleteClick,
}: Props) {
  const {
    active,
    attributes,
    isDragging,
    isSorting,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges: undefined,
    disabled: disabled,
    getNewIndex: undefined,
  });

  const wrapperStyleWithDraggingState = useMemo(
    () => ({ ...wrapperStyle, index, isDragging, active, id, padding: 5 }),
    [active, id, index, isDragging, wrapperStyle]
  );

  const title = useMemo(
    () => (
      <DndItemLayout>
        <Text>{card?.title}</Text>
      </DndItemLayout>
    ),
    [card]
  );

  const actions = useMemo(
    () => (
      <DndItemLayout>
        <Flex direction={"row"} gap={"10px"} align={"center"}>
          <CardVisibilitySwitch
            checked={card.memorized === false}
            onCheckedChange={(checked) => {
              OnVisibilitySwitchClick(card.id, checked);
            }}
          />
          <EditCardButton
            onClick={() => {
              onEditClick(card);
            }}
          />
          <DeleteCardButton
            onClick={() => {
              onDeleteClick(card.id);
            }}
          />
        </Flex>
      </DndItemLayout>
    ),
    [card, OnVisibilitySwitchClick, onEditClick, onDeleteClick]
  );

  return (
    <DndItem
      ref={setNodeRef}
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      index={index}
      transform={transform}
      transition={transition}
      wrapperStyle={wrapperStyleWithDraggingState}
      listeners={listeners}
      data-index={index}
      data-id={id}
      title={title}
      actions={actions}
      {...attributes}
    />
  );
});
