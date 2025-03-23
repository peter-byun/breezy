import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import styled, { css } from "styled-components";
import { Card } from "./api/type";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

type CardBoxProps = PropsWithChildren<{
  card: Card;
  zIndex: number;
  onMemorized: (card: Card) => void;
  onForgot: (card: Card) => void;
}>;

const ROTATION_FRONT = "rotateY(0deg)";
const ROTATION_BACK = "rotateY(180deg)";

export const CardBox = (props: CardBoxProps) => {
  // Dynamic Styles
  const [zIndex, setZIndex] = useState(props.zIndex);
  useEffect(() => {
    setZIndex(props.zIndex);
  }, [props]);

  const [{ x, y }, draggingEffectApi] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

  const [{ scale }, hoverEffectApi] = useSpring(() => ({
    scale: 1,
  }));

  const [{ transform }, flipEffectApi] = useSpring(() => ({
    transform: ROTATION_FRONT,
    config: {
      duration: 50,
    },
  }));
  const [flipped, setFlipped] = useState(false);

  // Dragging Handler
  const bind = useDrag(
    ({
      down,
      movement: [mx, my],
      active: gestureActive,
      direction: [dx],
      last,
      distance,
    }) => {
      // Swipe
      const swiped = !gestureActive;
      const swipedLeft = dx === -1 && swiped;
      const swipedRight = dx === 1 && swiped;
      if (swipedLeft) {
        hideCard();
      }
      if (swipedRight) {
        props.onForgot(props.card);
      }
      // Dragging
      draggingEffectApi.start({
        x: down ? mx : 0,
        y: down ? my : 0,
        immediate: down,
        config: {
          duration: down ? 0 : 200,
        },
      });
      hoverEffectApi.start({
        scale: down ? 1.1 : 1,
        config: {
          duration: 100,
        },
      });
      // Short press
      if (last && distance[0] < 2 && distance[1] < 2) {
        setFlipped(!flipped);
        flipEffectApi.start({
          transform: flipped ? ROTATION_FRONT : ROTATION_BACK,
        });
      }
    }
  );

  const ref = useRef<HTMLDivElement>(null);
  function hideCard() {
    ref.current
      ?.animate(
        [
          {
            opacity: 1,
          },
          {
            opacity: 0,
          },
        ],
        {
          duration: 100,
          iterations: 1,
        }
      )
      .finished.then(() => {
        if (ref.current?.style) {
          ref.current.style.opacity = "0";
          props.onMemorized(props.card);
        }
      });
  }

  // Re-render after being reordered
  useEffect(() => {
    draggingEffectApi.start({
      x: 0,
      y: 0,
      immediate: false,
    });
  }, [draggingEffectApi]);
  useEffect(() => {
    hoverEffectApi.start({
      scale: 1,
      config: {
        duration: 100,
      },
    });
  }, [hoverEffectApi]);

  return (
    <StyledCard
      ref={ref}
      key={props.card.title}
      as={animated.div}
      style={{
        x,
        y,
        scale,
        zIndex,
      }}
      {...bind()}
    >
      <CardContent
        as={animated.div}
        style={{
          transform,
        }}
      >
        <CardFront>{props.card.title}</CardFront>
        <CardBack>{props.card.content}</CardBack>
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 12px;

  transition: opacity 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  box-shadow: rgba(165, 165, 165, 0.2) 0px 7px 29px 0px;
`;

const CardContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  transform-style: preserve-3d;
`;
const CardContentStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
`;
const CardFront = styled.h2`
  ${CardContentStyle};
  background-color: #4ae466;
  color: black;
`;
const CardBack = styled.h3`
  ${CardContentStyle};
  background-color: #f0f0f0;
  color: black;

  width: 100%;
  height: 100%;

  transform: rotateY(180deg);
`;
