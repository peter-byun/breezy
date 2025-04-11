import { css } from "@emotion/react";

interface Props {
  children: React.ReactNode;
}

export function DndListLayout({ children }: Props) {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
        justify-content: flex-start;
        justify-content: center;
      `}
    >
      {children}
    </div>
  );
}
