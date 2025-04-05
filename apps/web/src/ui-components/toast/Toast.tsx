import { isNonEmptyString } from "@/utils/type-check";
import { Toast as RadixToast } from "radix-ui";
import { ComponentProps } from "react";
import styles from "./toast.module.css";
import { Cross1Icon } from "@radix-ui/react-icons";

interface ToastProps {
  isOpen: boolean;
  onOpenChange?: OnOpenChange;
  title: string;
  description?: string;
}

type OnOpenChange = ToastRootProps["onOpenChange"];
type ToastRootProps = ComponentProps<typeof RadixToast.Root>;

export const Toast = ({
  isOpen,
  onOpenChange,
  title,
  description,
}: ToastProps) => {
  return (
    <RadixToast.Provider>
      <RadixToast.Root
        open={isOpen}
        onOpenChange={onOpenChange}
        className={styles.Root}
      >
        <RadixToast.Title className={styles.Title}>{title}</RadixToast.Title>

        {isNonEmptyString(description) && (
          <RadixToast.Description>{description}</RadixToast.Description>
        )}

        <RadixToast.Close className={styles.Button}>
          <Cross1Icon />
        </RadixToast.Close>
      </RadixToast.Root>

      <RadixToast.Viewport className={styles.Viewport} />
    </RadixToast.Provider>
  );
};
