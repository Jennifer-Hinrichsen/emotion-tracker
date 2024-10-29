import styled from "styled-components";
import { emotionsIcons } from "./EmotionIcons";

export default function EmotionCard({ emotion }) {
  return (
    <StyledEmotionCard>
      <h2>{emotion.emotionType}</h2>
      <StyledEmojiIcon>{emotionsIcons[emotion.emotionType]}</StyledEmojiIcon>
      <p>Intensity: {emotion.intensity}</p>
      <p>Notes: {emotion.notes}</p>
      <StyledDateTime>{emotion.dateTime}</StyledDateTime>
    </StyledEmotionCard>
  );
}

const StyledEmotionCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: left;
  font-size: 1rem;
  margin: 16px 8px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  word-break: break-word;
`;
const StyledEmojiIcon = styled.span`
  align-self: flex-end;
  width: 40px;
  height: 40px;
`;
const StyledDateTime = styled.p`
  align-self: flex-end;
`;
