import React from "react";
import { clsx } from "clsx";

import styles from "./Wrapper.module.css";

interface Props {
  children: React.ReactNode;
  center?: boolean;
  style?: React.CSSProperties;
}

export function Wrapper({ children, center, style }: Props) {
  return (
    <div
      className={clsx(styles.Wrapper, center && styles.center)}
      style={style}
    >
      {children}
    </div>
  );
}
