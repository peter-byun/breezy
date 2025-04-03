import { css } from "@emotion/react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { ButtonProps, IconButton } from "@radix-ui/themes";

export const EditCardButton = ({ onClick }: ButtonProps) => {
  return (
    <IconButton
      onClick={onClick}
      color="blue"
      variant="outline"
      css={css`
        cursor: pointer;
      `}
    >
      <Pencil1Icon width="18" height="18" color="blue" />
    </IconButton>
  );
};
