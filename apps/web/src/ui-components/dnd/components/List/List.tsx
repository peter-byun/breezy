import React, { Ref } from "react";
import { clsx } from "clsx";

import styles from "./List.module.css";

export interface Props {
  children: React.ReactNode;
  columns?: number;
  style?: React.CSSProperties;
  horizontal?: boolean;
  ref: Ref<HTMLUListElement>;
}

export const List = ({
  ref,
  children,
  columns = 1,
  horizontal,
  style,
}: Props) => {
  return (
    <ul
      ref={ref}
      style={
        {
          ...style,
          "--columns": columns,
        } as React.CSSProperties
      }
      className={clsx(styles.List, horizontal && styles.horizontal)}
    >
      {children}
    </ul>
  );
};
