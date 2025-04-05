import { useOverlay } from "@toss/use-overlay";
import { ReactNode } from "react";

type RenderAlert = (props: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onOpenChange: (open: boolean) => void;
}) => ReactNode;

export const useOpenAlert = () => {
  const overlay = useOverlay();

  const openAlert = (renderAlert: RenderAlert) => {
    return new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, close }) => {
        const onConfirm = () => {
          close();
          resolve(true);
        };
        const onCancel = () => {
          close();
          resolve(false);
        };
        const onOpenChange = (nextOpen: boolean) => {
          if (!nextOpen) {
            close();
            resolve(false);
          }
        };

        return renderAlert({
          isOpen,
          onConfirm,
          onCancel,
          onOpenChange,
        });
      });
    });
  };

  return openAlert;
};
