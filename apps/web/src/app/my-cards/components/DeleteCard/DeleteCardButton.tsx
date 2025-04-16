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
        onClick?.(e);
      }}
      color="red"
      variant="outline"
      css={css`
        cursor: pointer;
      `}
      data-testid="delete-card-button"
    >
      <TrashIcon width="18" height="18" color="red" />
    </IconButton>
  );
};
