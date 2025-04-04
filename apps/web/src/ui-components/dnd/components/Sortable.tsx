"use client";

import {
  Active,
  CollisionDetection,
  DropAnimation,
  KeyboardCoordinateGetter,
  Modifiers,
  MeasuringConfiguration,
  PointerActivationConstraint,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  useSortable,
  SortingStrategy,
  AnimateLayoutChanges,
  NewIndexGetter,
} from "@dnd-kit/sortable";
import { Item } from "./Item";

export interface SortableProps {
  activationConstraint?: PointerActivationConstraint;
  animateLayoutChanges?: AnimateLayoutChanges;
  adjustScale?: boolean;
  collisionDetection?: CollisionDetection;
  coordinateGetter?: KeyboardCoordinateGetter;
  dropAnimation?: DropAnimation | null;
  getNewIndex?: NewIndexGetter;
  itemCount?: number;
  items?: UniqueIdentifier[];
  measuring?: MeasuringConfiguration;
  modifiers?: Modifiers;
  removable?: boolean;
  reorderItems?: typeof arrayMove;
  strategy?: SortingStrategy;
  style?: React.CSSProperties;
  getItemStyles?: GetItemStyles;
  wrapperStyle?(args: {
    active: Pick<Active, "id"> | null;
    index: number;
    isDragging: boolean;
    id: UniqueIdentifier;
  }): React.CSSProperties;
  isDisabled?(id: UniqueIdentifier): boolean;
}

interface GetItemStyles {
  (args: {
    id: UniqueIdentifier;
    index: number;
    isSorting: boolean;
    isDragOverlay?: boolean;
    overIndex: number;
    isDragging: boolean;
  }): React.CSSProperties;
}

interface SortableItemProps {
  animateLayoutChanges?: AnimateLayoutChanges;
  disabled?: boolean;
  getNewIndex?: NewIndexGetter;
  id: UniqueIdentifier;
  index: number;
  onRemove?(id: UniqueIdentifier): void;
  renderItem?(): React.ReactElement;
  wrapperStyle: SortableProps["wrapperStyle"];
}

export function SortableItem({
  disabled,
  animateLayoutChanges,
  getNewIndex,
  id,
  index,
  renderItem,
  wrapperStyle,
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
    animateLayoutChanges,
    disabled,
    getNewIndex,
  });

  return (
    <Item
      ref={setNodeRef}
      value={id}
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      renderItem={renderItem}
      index={index}
      transform={transform}
      transition={transition}
      wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
      listeners={listeners}
      data-index={index}
      data-id={id}
      {...attributes}
    />
  );
}
