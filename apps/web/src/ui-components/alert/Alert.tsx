import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { isNonEmptyString } from "@/utils/type-check";
import { RootProps } from "@radix-ui/themes/components/alert-dialog";
import { css } from "@emotion/react";

interface Props extends Omit<RootProps, "children"> {
  isOpen: boolean;
  title: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  shouldShowCancel?: boolean;
  onOpenChange?: RootProps["onOpenChange"];
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const Alert = ({
  title,
  isOpen,
  description,
  cancelLabel,
  confirmLabel,
  shouldShowCancel = false,
  onCancel,
  onConfirm,
  onOpenChange,
}: Props) => {
  return (
    <AlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Content maxWidth="450px">
        <Flex gap="3" direction={"column"} align="center" justify="center">
          <AlertDialog.Title
            css={css`
              margin: 0px;
            `}
          >
            {title}
          </AlertDialog.Title>
          {isNonEmptyString(description) && (
            <AlertDialog.Description size="2">
              {description}
            </AlertDialog.Description>
          )}
        </Flex>

        <Flex gap="3" mt="4" justify="center">
          {shouldShowCancel && (
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" onClick={onCancel}>
                {isNonEmptyString(cancelLabel) ? cancelLabel : "Cancel"}
              </Button>
            </AlertDialog.Cancel>
          )}
          <AlertDialog.Action>
            <Button variant="solid" color="blue" onClick={onConfirm}>
              {isNonEmptyString(confirmLabel) ? confirmLabel : "Confirm"}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
