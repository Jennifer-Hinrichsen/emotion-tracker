import { useEffect } from "react";
import anime from "animejs";
import MoodwaveLogo from "assets/navigationIcon/moodwave-logo.svg";

export default function SpinningDots() {
  useEffect(() => {
    // Animation for dots (now with class ".dot")
    anime({
      targets: ".dots",
      translateX: () => anime.random(-300, 300), // Random horizontal movement
      translateY: () => anime.random(-300, 300), // Random vertical movement
      scale: () => anime.random(0.5, 4), // Random scaling
      opacity: () => anime.random(0.3, 1), // Random opacity
      easing: "easeInOutQuad", // Smooth animation
      duration: () => anime.random(100, 300), // Varying duration for different dots
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
      delay: 2000, // Start after 3 seconds
      complete: () => {
        // Final animation for dots: grow to cover the entire screen
        anime({
          targets: ".dots",
          scale: [1, 50], // Grow significantly (enough to cover the screen)
          opacity: [1, 0], // Fade out the dot during zoom
          easing: "easeInOutCubic", // Smooth in-and-out easing
          duration: 1000, // Duration of the zoom effect
          delay: 0, // Start immediately after the logo completes
          translateX: ["50%", "50%"], // Center the dot horizontally
          translateY: ["50%", "50%"], // Center the dot vertically
        });

        // Final animation for logo: zoom towards you and disappear
        anime({
          targets: ".logo",
          scale: [1, 10], // Grow the logo significantly (zoom towards user)
          opacity: [1, 0], // Fade out during zoom
          easing: "easeInOutCubic", // Smooth in-and-out easing
          duration: 1500, // Duration of the zoom effect
          translateY: ["0", "-100vh"], // Move the logo upwards to disappear
        });
      },
    });
  }, []);

  const dots = Array.from({ length: 10 }).map((_, index) => (
    <div className="dots" key={index}></div> // Updated class to ".dots"
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
