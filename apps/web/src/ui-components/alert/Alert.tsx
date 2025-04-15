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
  testId?: string;
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
  testId = "alert-root",
}: Props) => {
  return (
    <AlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Content maxWidth="450px" data-testid={testId}>
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
              <Button
                variant="soft"
                color="gray"
                onClick={onCancel}
                data-testid="alert-cancel"
              >
                {isNonEmptyString(cancelLabel) ? cancelLabel : "Cancel"}
              </Button>
            </AlertDialog.Cancel>
          )}
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="blue"
              onClick={onConfirm}
              data-testid="alert-confirm"
            >
              {isNonEmptyString(confirmLabel) ? confirmLabel : "Confirm"}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
