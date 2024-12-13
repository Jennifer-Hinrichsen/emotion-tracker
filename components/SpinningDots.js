import { useState, useEffect } from "react";
import anime from "animejs";
import MoodwaveLogo from "assets/navigationIcon/moodwave-logo.svg";
import styled from "styled-components";

const generateRandomPosition = (axis) => {
  const screenSize = axis === "x" ? window.innerWidth : window.innerHeight;
  return anime.random(-screenSize / 2, screenSize / 2);
};

const dots = Array.from({ length: 10 }).map(() => {
  return {
    id: crypto.randomUUID(),
    x: generateRandomPosition("x"),
    y: generateRandomPosition("y"),
  };
});

export default function SpinningDots() {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    anime({
      targets: ".dot",
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

  return (
    <StyledContainer className="container-dots">
      <StyledLogo
        className="logo"
        src="/assets/navigationIcon/moodwave-logo.svg"
        alt="Moodwave Logo"
      />
      {dots.map((dot) => {
        <StyledDot className="dot" key="dot.id" $x={dot.x} $y={dot.y} />;
      })}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(
    45deg,
    var(--color-frame),
    var(--color-secondary)
  );
  z-index: 1000;
`;

const StyledDot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  background: var(--color-cards-foreground);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  opacity: 90%;
  translate: ${(props) => `${props.$x}px ${props.$y}px`};
`;

const StyledLogo = styled(MoodwaveLogo)`
  position: absolute;
  width: 300px;
  height: auto;
  top: 40%;
  left: 14%;
  transform: translate(-50%, -50%);
  color: var(--color-cards-foreground);
  z-index: 5;
  opacity: 0;
`;
