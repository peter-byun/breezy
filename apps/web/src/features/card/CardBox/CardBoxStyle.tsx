import styled, { css } from "styled-components";

export const CardBoxRoot = styled.div<{
  $size: number;
}>`
  position: absolute;
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border-radius: 12px;

  transition: opacity 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  box-shadow: rgba(165, 165, 165, 0.2) 0px 7px 29px 0px;
  :hover {
    cursor: pointer;
  }

  touch-action: none;
`;

export const CardContent = styled.div`
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
export const CardFront = styled.h2`
  ${CardContentStyle};
  background-color: #4ae466;
  color: black;
`;
export const CardBack = styled.h3`
  ${CardContentStyle};
  background-color: #f0f0f0;
  color: black;

  width: 100%;
  height: 100%;

  transform: rotateY(180deg);
`;
