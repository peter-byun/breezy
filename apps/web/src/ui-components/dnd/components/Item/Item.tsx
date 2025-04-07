import { forwardRef, memo, useEffect } from "react";
import { clsx } from "clsx";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";

import styles from "./Item.module.css";
import { DragHandleDots1Icon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import { css } from "@emotion/react";

export interface Props {
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  title: React.ReactNode;
  actions?: React.ReactNode;
}

export const Item = memo(
  forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        index,
        listeners,
        sorting,
        style,
        transition,
        transform,
        wrapperStyle,
        title,
        actions,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      return (
        <li
          className={clsx(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay
          )}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(", "),
              "--translate-x": transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              "--translate-y": transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              "--scale-x": transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              "--scale-y": transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              "--index": index,
              "--color": color,
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div
            className={clsx(
              styles.Item,
              dragging && styles.dragging,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
              color && styles.color
            )}
            style={style}
          >
            <div
              {...listeners}
              {...props}
              tabIndex={0}
              css={css`
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
              `}
            >
              <Flex
                direction={"row"}
                align={"center"}
                gap={"1"}
                css={css`
                  cursor: grab;
                `}
              >
                <DragHandleDots1Icon></DragHandleDots1Icon>
                {title}
              </Flex>
            </div>
            {actions}
          </div>
        </li>
      );
    }
  )
);
