import { useLocalStorage } from "usehooks-ts";

export const useOnboardingState = () => {
  const [onboardingTriggered, setOnboardingTriggered] = useLocalStorage(
    "onboardingTriggered",
    false
  );

  const [showOnboardingLayer, setShowOnboardingLayer] = useLocalStorage(
    "showOnboardingLayer",
    false
  );

  return {
    onboardingTriggered,
    setOnboardingTriggered,
    showOnboardingLayer,
    setShowOnboardingLayer,
  };
};
