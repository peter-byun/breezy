import { useOverlay } from "@toss/use-overlay";

export const useDialog = () => {
  const overlay = useOverlay();
  const setOpen = (open: boolean) => {
    if (!open) {
      overlay.close();
    }
  };

  return {
    setOpen,
    ...overlay,
  };
};
