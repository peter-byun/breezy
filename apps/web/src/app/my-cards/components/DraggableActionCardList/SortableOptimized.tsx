"use client";

import { Card } from "@/features/card/api/type";
import { Item } from "@/ui-components/dnd/components/Item";
import { ItemLayout } from "@/ui-components/dnd/components/Item/ItemLayout";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { Flex, Text } from "@radix-ui/themes";
import { memo, useMemo } from "react";
import { ItemStyle } from "react-tiny-virtual-list";
import { CardVisibilitySwitch } from "../CardVisibility/CardVisibilitySwitch";
import { EditCardButton } from "../EditCard/EditCardButton";
import { DeleteCardButton } from "../DeleteCard/DeleteCardButton";
import { OnVisibilitySwitchClick } from "./DraggableActionCardList";

interface SortableItemProps {
  id: UniqueIdentifier;
  index: number;
  wrapperStyle: ItemStyle;

  card: Card;
  onEditClick: (cardId: string) => void;
  onDeleteClick: (cardId: string) => void;
  OnVisibilitySwitchClick: OnVisibilitySwitchClick;
}

const disabled = false;

export const SortableOptimized = memo(function Sortable({
  id,
  index,
  wrapperStyle,

  card,
  OnVisibilitySwitchClick,
  onEditClick,
  onDeleteClick,
}: SortableItemProps) {
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
      <ItemLayout>
        <Text>{card?.title}</Text>
      </ItemLayout>
    ),
    [card]
  );

  const actions = useMemo(
    () => (
      <ItemLayout>
        <Flex direction={"row"} gap={"10px"} align={"center"}>
          <CardVisibilitySwitch
            checked={card.memorized === false}
            onCheckedChange={(checked) => {
              OnVisibilitySwitchClick(card.id, checked);
            }}
          />
          <EditCardButton
            onClick={() => {
              onEditClick(card.id);
            }}
          />
          <DeleteCardButton
            onClick={() => {
              onDeleteClick(card.id);
            }}
          />
        </Flex>
      </ItemLayout>
    ),
    [
      card.id,
      card.memorized,
      OnVisibilitySwitchClick,
      onEditClick,
      onDeleteClick,
    ]
  );

  return (
    <Item
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
