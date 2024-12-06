import styled from "styled-components";

export default function StatisticCircle({ count, color }) {
  const circleSize = Math.min(200, count * 30);

  return <Circle size={circleSize} color={color} />;
}

const Circle = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  flex-shrink: 0; /* Verhindert, dass der Kreis verkleinert wird */
  margin: 0 16px 8px 0; /* Abstand zum Text */
`;
