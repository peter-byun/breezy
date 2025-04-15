import { useOnboardingState } from "@/app/play/components/PlayOnboarding/useOnboardingState";
import { renderHook } from "@testing-library/react";
import { useEffect } from "react";

export const hideOnboarding = () => {
  renderHook(() => {
    const { setShowOnboardingLayer } = useOnboardingState();
    useEffect(() => {
      setShowOnboardingLayer(false);
    }, [setShowOnboardingLayer]);
  });
};
