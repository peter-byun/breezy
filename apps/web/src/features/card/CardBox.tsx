import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import styled from "styled-components";
import { Card } from "./api/type";
import { CSSProperties, PropsWithChildren, useState } from "react";

type CardBoxProps = PropsWithChildren<{
  card: Card;
  onMemorized: (card: Card) => void;
}>;

const HIDDEN_Z_INDEX = -1;
const BG_FRONT = "#c0f3ff";
const BG_BACK = "#f0f0f0";
const ROTATION_FRONT = "rotate3d(1, 1, 1, 0deg)";
const ROTATION_BACK = "rotate3d(1, 1, 1, 360deg)";

export const CardBox = (props: CardBoxProps) => {
  // Dynamic Styles
  const [cardStyle, setCardStyle] = useState<CSSProperties>({
    zIndex: props.card.memorized ? HIDDEN_Z_INDEX : props.card.order,
  });
  const [{ x, y }, draggingApi] = useSpring(() => ({
    x: 0,
    y: 0,
  }));
  const [{ scale }, activeApi] = useSpring(() => ({
    scale: 1,
  }));
  const [{ transform, backgroundColor }, flipApi] = useSpring(() => ({
    transform: ROTATION_FRONT,
    backgroundColor: BG_FRONT,
  }));
  const [flipped, setFlipped] = useState(false);

  // Dragging Handler
  const bind = useDrag(
    ({
      down,
      movement: [mx, my],
      active: gestureActive,
      velocity: [vx],
      direction: [dx],
      last,
      distance,
    }) => {
      // Dragging effect
      draggingApi.start({
        x: down ? mx : 0,
        y: down ? my : 0,
        immediate: down,
      });
      activeApi.start({
        scale: down ? 1.1 : 1,
        config: {
          duration: 100,
        },
      });

      // Left swipe
      const flipVelocityThreshold = vx > 0.1;
      if (dx === -1 && !gestureActive && flipVelocityThreshold) {
        props.onMemorized(props.card);
        setTimeout(() => {
          setCardStyle({
            ...cardStyle,
            zIndex: HIDDEN_Z_INDEX,
          });
        }, 300);
      }

      // Short press
      if (last && distance[0] < 5 && distance[1] < 5) {
        setFlipped(!flipped);
        flipApi.start({
          transform: flipped ? ROTATION_FRONT : ROTATION_BACK,
          backgroundColor: flipped ? BG_FRONT : BG_BACK,
        });
      }
    }
  );

  return (
    <StyledCard
      key={props.card.title}
      as={animated.div}
      style={{
        x,
        y,
        scale,
        transform,
        backgroundColor,
        ...cardStyle,
      }}
      $fadedOut={props.card.memorized}
      {...bind()}
    >
      {flipped ? (
        <CardContent>{props.card.content}</CardContent>
      ) : (
        <CardTitle>{props.card.title}</CardTitle>
      )}
    </StyledCard>
  );
};

const StyledCard = styled.div<{
  $fadedOut: boolean;
}>`
  position: absolute;
  width: 300px;
  height: 300px;
  padding: 16px;
  border-radius: 12px;

  opacity: ${({ $fadedOut }) => ($fadedOut ? 0 : 1)};
  transition: opacity 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  box-shadow: rgba(165, 165, 165, 0.2) 0px 7px 29px 0px;
`;
const CardTitle = styled.h2`
  color: black;
`;
const CardContent = styled.h3`
  color: black;

  width: 100%;
  height: 100%;
`;
