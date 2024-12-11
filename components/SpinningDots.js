import { useState, useEffect } from "react";
import anime from "animejs";
import MoodwaveLogo from "assets/navigationIcon/moodwave-logo.svg";

export default function SpinningDots() {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Blockieren des Scrollens während der Animation
    document.body.style.overflow = "hidden";

    // Punkte-Animation
    anime({
      targets: ".dots",
      translateX: () => anime.random(-300, 300),
      translateY: () => anime.random(-300, 300),
      scale: () => anime.random(0.5, 4),
      opacity: () => anime.random(0.3, 1),
      easing: "easeInOutQuad",
      duration: () => anime.random(100, 300),
      delay: (el, i) => i * 100,
      direction: "alternate",
    });

    // Moodwave-Logo-Animation
    anime({
      targets: ".logo",
      scale: [0, 1],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 2000,
      delay: 2000,
      complete: () => {
        // Animation für die Punkte
        anime({
          targets: ".dots",
          scale: [1, 50],
          opacity: [1, 0],
          easing: "easeInOutCubic",
          duration: 1000,
          translateX: ["50%", "50%"],
          translateY: ["50%", "50%"],
        });

        // Animation für das Logo
        anime({
          targets: ".logo",
          scale: [1, 10],
          opacity: [1, 0],
          easing: "easeInOutCubic",
          duration: 1500,
          translateY: ["0", "-100vh"],
          complete: () => {
            // Setze den Zustand nach Abschluss der Animation
            setTimeout(() => {
              setAnimationComplete(true);
              document.body.style.overflow = "auto"; // Scrollen wieder aktivieren
            }, -1000); // Verzögerung für sanftes Entfernen
          },
        });
      },
    });
  }, []);

  // Wenn die Animation abgeschlossen ist, rendern wir das Container-Element nicht mehr
  if (animationComplete) {
    return null;
  }

  const dots = Array.from({ length: 10 }).map((_, index) => (
    <div className="dots" key={index}></div>
  ));

  return (
    <div className="container-dots">
      {dots}
      <MoodwaveLogo
        className="logo"
        src="/assets/navigationIcon/moodwave-logo.svg"
        alt="Moodwave Logo"
      />
    </div>
  );
}
