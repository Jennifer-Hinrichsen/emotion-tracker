import styled from "styled-components";

export default function EmotionCard({ entry }) {
  return (
    <StyledEmotionCard>
      <h2>{entry.emotion}</h2>
      <p>Intensity: {entry.intensity}</p>
      <p>Notes: {entry.notes}</p>
      <StyledDateTime>{entry.dateTime}</StyledDateTime>
    </StyledEmotionCard>
  );
}

const StyledEmotionCard = styled.section`
  font-size: 1rem;
  margin: 16px 8px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
`;

const StyledDateTime = styled.p`
  text-align: right;
`;
