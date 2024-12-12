import { useState, useEffect } from "react";
import anime from "animejs";
import MoodwaveLogo from "assets/navigationIcon/moodwave-logo.svg";

export default function SpinningDots() {
  const [animationComplete, setAnimationComplete] = useState(false);

  const generateRandomPosition = (axis) => {
    const screenSize = axis === "x" ? window.innerWidth : window.innerHeight;
    return anime.random(-screenSize / 2, screenSize / 2);
  };

  useEffect(() => {
    const dots = document.querySelectorAll(".dots");
    dots.forEach((dot) => {
      const randomX = generateRandomPosition("x");
      const randomY = generateRandomPosition("y");
      dot.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });

    anime({
      targets: ".dots",
      translateX: 0,
      translateY: 0,
      scale: [1, 3],
      opacity: [1, 0],
      easing: "easeInOutCubic",
      duration: 1000,
      delay: (el, i) => i * 50,
    });

    anime({
      targets: ".logo",
      scale: [0, 1],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1000,
      delay: 1000,
      complete: () => {
        anime({
          targets: ".dots",
          scale: [1, 100],
          opacity: [0, 1],
          easing: "easeInOutCubic",
          duration: 1000,
          delay: 200,
        });

        anime({
          targets: ".logo",
          scale: [1, 10],
          opacity: [1, 0],
          easing: "easeInOutCubic",
          duration: 1000,
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
