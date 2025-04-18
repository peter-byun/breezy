import { css } from "@emotion/react";
import { AvatarIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { MouseEventHandler } from "react";

export const ProfileButton = ({
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <IconButton
      onClick={(e) => {
        onClick?.(e);
      }}
      color="blue"
      variant="ghost"
      css={css`
        cursor: pointer;
      `}
      data-testid="profile-button"
    >
      <AvatarIcon width="24" height="24" color="black" />
    </IconButton>
  );
};
