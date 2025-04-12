"use client";

import { animated, useSpring } from "@react-spring/web";

import { useDrag } from "@use-gesture/react";

import { Card } from "../../../../features/card/api/type";
import {
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CardBack,
  FlipCardRoot,
  CardContent,
  CardFront,
} from "./FlipCardStyle";

type FlipCardProps = PropsWithChildren<{
  card: Card;
  zIndex: number;
  size?: number;
  onSwipeLeft?: (card: Card, ref: FlipCardRef) => void;
  onSwipeRight?: (card: Card, ref: FlipCardRef) => void;
  onFlip: () => void;
}>;
export type FlipCardRef = RefObject<HTMLDivElement | null>;

const FlipCardRootAnimated = animated(FlipCardRoot);
const CardContentAnimated = animated(CardContent);

const CARD_ROTATION_FRONT = "rotateY(0deg)";
const CARD_ROTATION_BACK = "rotateY(180deg)";

export const FlipCard = (props: FlipCardProps) => {
  const { size = 300 } = props;
  const ref = useRef<HTMLDivElement>(null);

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
    transform: CARD_ROTATION_FRONT,
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
        props.onSwipeLeft?.(props.card, ref);
      }
      if (swipedRight) {
        props.onSwipeRight?.(props.card, ref);
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
          transform: flipped ? CARD_ROTATION_FRONT : CARD_ROTATION_BACK,
        });

        props.onFlip();
      }
    }
  );

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
    <FlipCardRootAnimated
      ref={ref}
      key={props.card.title}
      style={{
        x,
        y,
        scale,
        zIndex,
      }}
      size={size}
      {...bind()}
    >
      <CardContentAnimated
        style={{
          transform,
        }}
      >
        <CardFront>{props.card.title}</CardFront>
        <CardBack>{props.card.content}</CardBack>
      </CardContentAnimated>
    </FlipCardRootAnimated>
  );
};
