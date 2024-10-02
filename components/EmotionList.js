import { initialEntries } from "@/lib/entries";
import styled from "styled-components";

export default function EmotionList() {
  return (
    <StyledEmotionList>
      {initialEntries.map((entry) => (
        <StyledEmotionCard key={entry.id}>
          <h2>{entry.emotion}</h2>
          <p>Intensity: {entry.intensity}</p>

          <StyledDateTime>{entry.dateTime}</StyledDateTime>
        </StyledEmotionCard>
      ))}
    </StyledEmotionList>
  );
}

const StyledEmotionList = styled.ul`
  padding: 0;
`;

const StyledEmotionCard = styled.li`
  font-size: 1rem;
  margin: 16px 8px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  list-style: none;
`;

const StyledDateTime = styled.p`
  text-align: right;
`;
