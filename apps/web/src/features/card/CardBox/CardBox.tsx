import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import { Card } from "../api/type";
import {
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { CardBack, CardBoxRoot, CardContent, CardFront } from "./CardBoxStyle";

export type CardBoxRef = RefObject<HTMLDivElement | null>;

type CardBoxProps = PropsWithChildren<{
  card: Card;
  zIndex: number;
  size?: number;
  onSwipeLeft?: (card: Card, ref: CardBoxRef) => void;
  onSwipeRight?: (card: Card, ref: CardBoxRef) => void;
}>;

const ROTATION_FRONT = "rotateY(0deg)";
const ROTATION_BACK = "rotateY(180deg)";

export const CardBox = (props: CardBoxProps) => {
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
          transform: flipped ? ROTATION_FRONT : ROTATION_BACK,
        });
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
    <CardBoxRoot
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
      $size={size}
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
    </CardBoxRoot>
  );
};
