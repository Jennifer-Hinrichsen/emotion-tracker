import styled, { keyframes } from "styled-components";

export default function StatisticCircles({ count, maxCount, color, filter }) {
  const maxRadius = 100;
  const radius = (Math.sqrt(count) / Math.sqrt(maxCount)) * maxRadius;
  const animationKey = `${filter}-${count}`;

  return <Circle key={animationKey} size={radius * 2} color={color} />;
}

const scaleUp = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  flex-shrink: 0;
  margin: 0 16px 8px 0;
  animation: ${scaleUp} 1s ease-in-out;
`;
