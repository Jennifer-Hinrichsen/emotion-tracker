import styled from "styled-components";
import { emotionsIcons } from "./EmotionIcons";

export default function EmotionCardContent({ emotion }) {
  return (
    <>
      <StyledEmotionCardContent>
        <StyledEmojiIcon>{emotionsIcons[emotion.emotionType]}</StyledEmojiIcon>
        <StyledEmotionType>{emotion.emotionType}</StyledEmotionType>
        <StyledIntensity>Intensity: {emotion.intensity}</StyledIntensity>
        <StyledNotes>Notes: {emotion.notes}</StyledNotes>
      </StyledEmotionCardContent>
    </>
  );
}

const StyledEmotionCardContent = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "emoji emotionType intensity"
    "emoji notes intensity";
  gap: 4px 8px;
  align-items: center;
  padding: 10px;
`;

const StyledEmojiIcon = styled.span`
  grid-area: emoji;
  width: 40px;
  height: 40px;
`;

const StyledEmotionType = styled.h2`
  grid-area: emotionType;
  margin: 0;
  font-size: 1.2rem;
`;

const StyledNotes = styled.p`
  grid-area: notes;
  margin: 0;
  color: #555;
  font-size: 0.9rem;
`;

const StyledIntensity = styled.p`
  grid-area: intensity;
  margin: 0;
  text-align: right;
  font-weight: bold;
  font-size: 0.9rem;
`;
