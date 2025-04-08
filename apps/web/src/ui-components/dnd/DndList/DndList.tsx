import { Ref } from "react";

import { css } from "@emotion/react";

export interface Props {
  children: React.ReactNode;
  columns?: number;
  style?: React.CSSProperties;
  ref: Ref<HTMLUListElement>;
}

export const DndList = ({ ref, children, columns = 1, style }: Props) => {
  return (
    <ul
      ref={ref}
      style={
        {
          ...style,
          "--columns": columns,
        } as React.CSSProperties
      }
      css={css`
        display: grid;
        grid-auto-rows: max-content;
        box-sizing: border-box;
        min-width: 500px;
        grid-gap: 10px;
        padding: 20px;
        padding-bottom: 0;
        margin: 10px;
        border-radius: 5px;
        min-height: 200px;
        transition: background-color 350ms ease;
        grid-template-columns: repeat(var(--columns, 1), 1fr);

        &:after {
          content: "";
          height: 10px;
          grid-column-start: span var(--columns, 1);
        }
      `}
    >
      {children}
    </ul>
  );
};
