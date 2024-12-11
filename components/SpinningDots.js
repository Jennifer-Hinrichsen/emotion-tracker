import { useEffect } from "react";
import anime from "animejs";

export default function SpinningDots() {
  useEffect(() => {
    anime({
      targets: ".dot",
      translateX: () => anime.random(-300, 300), // Random horizontal movement
      translateY: () => anime.random(-300, 300), // Random vertical movement
      scale: () => anime.random(0.5, 4), // Random scaling
      opacity: () => anime.random(0.3, 1), // Random opacity
      easing: "easeInOutQuad", // Smooth animation
      duration: () => anime.random(500, 1000), // Varying duration for different dots
      loop: true,
      delay: (el, i) => i * 100, // Staggered start for each dot
      direction: "alternate", // Reverse motion
      // autoplay: false,
    });
  }, []);

  const dots = Array.from({ length: 15 }).map((_, index) => (
    <div className="dot" key={index}></div>
  ));
  return <div className="organic-dots">{dots}</div>;
}
