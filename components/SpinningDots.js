import { useState, useEffect } from "react";
import anime from "animejs";
import MoodwaveLogo from "assets/navigationIcon/moodwave-logo.svg";

export default function SpinningDots() {
  const [animationComplete, setAnimationComplete] = useState(false);

  // Funktion zur Berechnung der zufälligen Positionen innerhalb der Grenzen
  const generateRandomPosition = (
    axis,
    excludeMin = -100,
    excludeMax = 100
  ) => {
    const screenSize = axis === "x" ? window.innerWidth : window.innerHeight;
    const randomValue = anime.random(-screenSize / 2, screenSize / 2);
    if (randomValue > excludeMin && randomValue < excludeMax) {
      return generateRandomPosition(axis, excludeMin, excludeMax); // Rekursiver Aufruf, falls in Ausschlussbereich
    }
    return randomValue;
  };

  useEffect(() => {
    anime({
      targets: ".dots",
      translateX: () => generateRandomPosition("x"),
      translateY: () => generateRandomPosition("y"),
      scale: () => anime.random(0.5, 4),
      opacity: () => anime.random(0.3, 1),
      easing: "easeInOutQuad",
      duration: () => anime.random(100, 300),
      delay: (el, i) => i * 100,
      direction: "alternate",
    });

    anime({
      targets: ".logo",
      scale: [0, 1],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 2000,
      delay: 2000,
      complete: () => {
        anime({
          targets: ".dots",
          scale: [1, 50],
          opacity: [1, 0],
          easing: "easeInOutCubic",
          duration: 1000,
        });

        anime({
          targets: ".logo",
          scale: [1, 10],
          opacity: [1, 0],
          easing: "easeInOutCubic",
          duration: 1500,
          translateY: ["0", "-100vh"],
          complete: () => {
            setAnimationComplete(true);
          },
        });
      },
    });
  }, []);

  if (animationComplete) {
    return null;
  }

  const dots = Array.from({ length: 10 }).map((_, index) => (
    <div className="dots" key={index}></div>
  ));

  return (
    <div className="container-dots">
      <MoodwaveLogo
        className="logo"
        src="/assets/navigationIcon/moodwave-logo.svg"
        alt="Moodwave Logo"
      />
      {dots}
    </div>
  );
}
