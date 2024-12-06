import styled from "styled-components";

export default function StatisticCircle({ count, maxCount, color }) {
  // Berechnung der Fläche proportional zur Häufigkeit
  const maxRadius = 100; // Maximale Radiusgröße in Pixeln
  const radius = (Math.sqrt(count) / Math.sqrt(maxCount)) * maxRadius;

  return <Circle size={radius * 2} color={color} />;
}

const Circle = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  flex-shrink: 0; /* Verhindert, dass der Kreis verkleinert wird */
  margin: 0 16px 8px 0; /* Abstand zum Text */
`;
//
