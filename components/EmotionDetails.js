import { initialEntries } from "@/lib/entries";
import styled from "styled-components";

console.log(initialEntries);
export default function EmotionDetails({ emotion, onBack }) {
  return (
    <>
      <StyledButton type="button" aria-label="navigate-back" onClick={onBack}>
        ←
      </StyledButton>
      <StyledHeadline>Emotion Details</StyledHeadline>
      <div>
        <h2>Type: {emotion.emotion}</h2>
        <p>Intensity: {emotion.intensity}</p>
        <p>Date and Time: {emotion.dateTime}</p>
        <p>Notes: {emotion.notes}</p>
      </div>
    </>
  );
}

const StyledButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  margin-right: 10px;
  display: inline-block;
`;

const StyledHeadline = styled.h1`
  display: inline-block;
`;
const StyledTitle = styled.h2`
  font-size: medium;
`;

const StyledParagraph = styled.p``;
