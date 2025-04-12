import { Alert } from "@/ui-components/alert/Alert";
import { useOpenAlert } from "@/ui-components/alert/useOpenAlert";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useIsMounted } from "usehooks-ts";
import { OnboardingStep1 } from "./OnboardingStep/OnboardingStep1";
import { OnboardingStep2 } from "./OnboardingStep/OnboardingStep2";
import { OnboardingStep3 } from "./OnboardingStep/OnboardingStep3";
import { useOnboardingState } from "./useOnboardingState";

export const PlayOnboarding = ({ currentStep }: { currentStep: number }) => {
  const {
    onboardingTriggered,
    setOnboardingTriggered,
    showOnboardingLayer,
    setShowOnboardingLayer,
  } = useOnboardingState();

  const openAlert = useOpenAlert();
  const isMounted = useIsMounted();

  useEffect(() => {
    const showOnboardingAlert = async () => {
      if (!isMounted()) {
        return;
      }
      if (onboardingTriggered) {
        return;
      }
      const confirmed = await openAlert((props) => (
        <Alert
          {...props}
          title="Welcome!"
          description="Let me show you how to play the game 😎"
          confirmLabel="Sounds good!"
          cancelLabel="No thanks"
        />
      ));
      setOnboardingTriggered(true);

      if (confirmed) {
        setShowOnboardingLayer(true);
      }
    };

    showOnboardingAlert();
  }, [
    isMounted,
    onboardingTriggered,
    openAlert,
    setOnboardingTriggered,
    setShowOnboardingLayer,
  ]);

  if (!showOnboardingLayer) {
    return null;
  }

  if (currentStep === 1) {
    return (
      <PlayOnboardingLayout>
        <OnboardingStep1 />
      </PlayOnboardingLayout>
    );
  }
  if (currentStep === 2) {
    return (
      <PlayOnboardingLayout>
        <OnboardingStep2 />
      </PlayOnboardingLayout>
    );
  }
  if (currentStep === 3) {
    return (
      <PlayOnboardingLayout>
        <OnboardingStep3 />
      </PlayOnboardingLayout>
    );
  }

  return null;
};

const PlayOnboardingLayout = styled.aside`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  width: 100%;
  height: 100%;
`;
