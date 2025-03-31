import { PropsWithChildren } from "react";
import styled from "@emotion/styled";

type TopNavBarItemProps = PropsWithChildren<{
  selected: boolean;
}>;

export const TopNavBarItem = (props: TopNavBarItemProps) => {
  return (
    <StyledTopNavBarItem $selected={props.selected}>
      {props.children}
    </StyledTopNavBarItem>
  );
};

const StyledTopNavBarItem = styled.div<{
  $selected: boolean;
}>`
  font-weight: ${({ $selected }) => ($selected ? "bold" : "normal")};
  padding: 12px;
  border-radius: 12px;

  transform: scale(1);
  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(1.1);
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  }
`;
