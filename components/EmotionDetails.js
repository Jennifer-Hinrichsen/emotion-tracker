import EmotionCard from "./EmotionCard";
import Heading from "./Heading";
import styled from "styled-components";

export default function EmotionDetails({ entry, onBack }) {
  return (
    <>
      <Heading>Emotion Details</Heading>
      <StyledButton type="button" aria-label="navigate-back" onClick={onBack}>
        ←
      </StyledButton>
      <EmotionCard entry={entry} />
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
