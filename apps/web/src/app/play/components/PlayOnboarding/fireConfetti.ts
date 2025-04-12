import { confetti, ConfettiOptions } from "@tsparticles/confetti";
import { delay, isBrowser } from "es-toolkit";

const count = 200;
const defaults = {
  origin: { y: 0.8 },
  zIndex: 0,
};

function fire(particleRatio: number, opts: ConfettiOptions) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

export const fireConfetti = async () => {
  await delay(200);

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });

  await delay(600);

  const secondOrigin = { x: 0.3, y: 0.4 };

  fire(0.25, {
    origin: secondOrigin,
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    origin: secondOrigin,
    spread: 60,
  });
  fire(0.35, {
    origin: secondOrigin,
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    origin: secondOrigin,
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    origin: secondOrigin,
    spread: 120,
    startVelocity: 45,
  });

  await delay(500);

  const thirdOrigin = { x: 0.7, y: 0.5 };

  fire(0.25, {
    origin: thirdOrigin,
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    origin: thirdOrigin,
    spread: 60,
  });
  fire(0.35, {
    origin: thirdOrigin,
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    origin: thirdOrigin,
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    origin: thirdOrigin,
    spread: 120,
    startVelocity: 45,
  });
  return delay(2000);
};

export const deleteConfettiCanvas = () => {
  if (isBrowser()) {
    document.querySelector("#confetti")?.remove();
  }
};
