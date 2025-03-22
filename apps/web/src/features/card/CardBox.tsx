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

export const CardBox = (props: CardBoxProps) => {
  const [cardStyle, setCardStyle] = useState<CSSProperties>({
    zIndex: props.card.memorized ? HIDDEN_Z_INDEX : props.card.order,
  });

  // Dragging animation
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(
    ({ down, movement: [mx, my], active, velocity: [vx], direction: [dx] }) => {
      api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });

      const trigger = vx > 0.1;
      if (dx === -1 && !active && trigger) {
        props.onMemorized(props.card);
        setTimeout(() => {
          setCardStyle({
            zIndex: HIDDEN_Z_INDEX,
          });
        }, 300);
      }
    }
  );

  // Flip animation
  const [
    { transform: flipTransform, backgroundColor: flipBackgroundColor },
    flipApi,
  ] = useSpring(() => ({
    transform: "rotate3d(1, 1, 1, 0deg)",
    backgroundColor: "#A1EAFB",
  }));
  const [flipped, setFlipped] = useState(false);
  const flipCard = () => {
    setFlipped(!flipped);
    flipApi.start({
      transform: flipped
        ? "rotate3d(1, 1, 1, 0deg)"
        : "rotate3d(1, 1, 1, 360deg)",
      backgroundColor: flipped ? "#A1EAFB" : "rgb(240, 240, 240)",
    });
  };

  return (
    <StyledCard
      key={props.card.title}
      as={animated.div}
      style={{
        x,
        y,
        transform: flipTransform,
        backgroundColor: flipBackgroundColor,
        ...cardStyle,
      }}
      {...bind()}
      $fadedOut={props.card.memorized}
      onClick={flipCard}
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
  background-color: #a1eafb;
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

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const CardTitle = styled.h2`
  color: black;
`;

const CardContent = styled.h3`
  color: black;

  width: 100%;
  height: 100%;
`;
