import React, { CSSProperties, Ref } from "react";
import { clsx } from "clsx";

import styles from "./Action.module.css";

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties["cursor"];
}

export const Action = ({
  ref,
  active,
  className,
  cursor,
  style,
  ...props
}: Props & {
  ref?: Ref<HTMLButtonElement>;
}) => {
  return (
    <button
      {...props}
      ref={ref}
      className={clsx(styles.Action, className)}
      tabIndex={0}
      style={
        {
          ...style,
          cursor,
          "--fill": active?.fill,
          "--background": active?.background,
        } as CSSProperties
      }
    />
  );
};
