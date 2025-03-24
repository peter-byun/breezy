"use client";
import { useCard } from "@/features/card/useCard";
import { PageLayout } from "@/features/layout/PageLayout";
import { TopNavBar } from "@/features/nav-bar/TopNavBar";
import styled from "styled-components";

import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { PropsWithChildren } from "react";
import {
  CardBoxRoot,
  CardContent,
  CardFront,
} from "@/features/card/CardBox/CardBoxStyle";

export default function MyCards() {
  const { cardsToShow } = useCard();

  return (
    <PageLayout>
      <TopNavBar />
      <DndContext>
        <CardsGrid>
          {cardsToShow.map((card) => (
            <CardHolder key={card.title} id={card.title}>
              <CardBoxRoot $size={200}>
                <CardContent>
                  <CardFront>{card.title}</CardFront>
                </CardContent>
              </CardBoxRoot>
            </CardHolder>
          ))}
        </CardsGrid>
      </DndContext>
    </PageLayout>
  );
}

const CardsGrid = (props: PropsWithChildren<{}>) => {
  return <StyledCardsGrid>{props.children}</StyledCardsGrid>;
};
const StyledCardsGrid = styled.section`
  position: relative;

  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 20px;

  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const CardHolder = (
  props: PropsWithChildren<{
    id: string;
  }>
) => {
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: "droppable-" + props.id,
  });

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable-" + props.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <CardHolderDroppable ref={setDroppableRef}>
      <StyledCardHolder
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        {props.children}
      </StyledCardHolder>
    </CardHolderDroppable>
  );
};
const StyledCardHolder = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;
const CardHolderDroppable = styled.div``;
