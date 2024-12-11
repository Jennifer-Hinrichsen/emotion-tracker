import { useEffect } from "react";
import anime from "animejs";
import MoodwaveLogo from "assets/navigationIcon/moodwave-logo.svg";

export default function SpinningDots() {
  useEffect(() => {
    // Animation for dots
    anime({
      targets: ".dot",
      translateX: () => anime.random(-300, 300), // Random horizontal movement
      translateY: () => anime.random(-300, 300), // Random vertical movement
      scale: () => anime.random(0.5, 4), // Random scaling
      opacity: () => anime.random(0.3, 1), // Random opacity
      easing: "easeInOutQuad", // Smooth animation
      duration: () => anime.random(100, 300), // Varying duration for different dots
      // loop: true,
      delay: (el, i) => i * 100, // Staggered start for each dot
      direction: "alternate", // Reverse motion
    });

    // Animation for MoodwaveLogo
    anime({
      targets: ".logo",
      scale: [0, 1], // Start small, grow to original size
      opacity: [0, 1], // Fade in
      easing: "easeOutExpo", // Smooth easing
      duration: 2000, // Duration of the animation
      delay: 3000, // Start after 3 seconds
    });
  }, []);

  const dots = Array.from({ length: 15 }).map((_, index) => (
    <div className="dot" key={index}></div>
  ));

  return (
    <div className="organic-dots">
      {dots}
      <MoodwaveLogo
        className="logo"
        src="/assets/navigationIcon/moodwave-logo.svg"
        alt="Moodwave Logo"
      />
    </div>
  );
}
