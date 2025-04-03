import { css } from "@emotion/react";
import { TrashIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { MouseEventHandler } from "react";

export const DeleteCardButton = ({
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <IconButton
      onClick={(e) => {
        console.log("click");
        e.stopPropagation();
        onClick?.(e);
      }}
      color="red"
      variant="outline"
      onMouseOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      css={css`
        cursor: pointer;
      `}
    >
      <TrashIcon width="18" height="18" color="red" />
    </IconButton>
  );
};
