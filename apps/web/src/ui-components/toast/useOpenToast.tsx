import { useOverlay } from "@toss/use-overlay";
import { ReactNode } from "react";

type RenderToast = (props: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => ReactNode;

export const useOpenToast = () => {
  const overlay = useOverlay();

  const openAlert = (renderToast: RenderToast) => {
    overlay.open(({ isOpen, close }) => {
      const onOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) {
          close();
        }
      };

      return renderToast({
        isOpen,
        onOpenChange,
      });
    });
  };

  return openAlert;
};
