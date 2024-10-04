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
      <StyledContainer>
        <h2>{emotion.emotion}</h2>
        <p>Intensity: {emotion.intensity}</p>

        <p>{emotion.notes}</p>
        <StyledDateTime>{emotion.dateTime}</StyledDateTime>
      </StyledContainer>
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
const StyledContainer = styled.div`
  font-size: 1rem;
  margin: 16px 8px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid lightgray;
  border-radius: 8px;
  list-style: none;
`;

const StyledDateTime = styled.p`
  text-align: right;
`;
