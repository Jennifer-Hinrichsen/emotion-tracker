import styled from "styled-components";
import { emotionsIcons } from "./EmotionIcons";

export default function EmotionCardContent({ emotion }) {
  return (
    <>
      <StyledEmotionCardContent>
        <StyledEmojiIcon>{emotionsIcons[emotion.emotionType]}</StyledEmojiIcon>
        <StyledEmotionType>{emotion.emotionType}</StyledEmotionType>
        <StyledIntensity>{emotion.intensity}</StyledIntensity>
        <StyledNotes>{emotion.notes}</StyledNotes>
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
  color: #313366;
`;

const StyledEmotionType = styled.p`
  grid-area: emotionType;
  margin: 6px 12px;
  font-weight: bold 600;
  font-size: 1.2rem;
  color: #313366;
`;

const StyledNotes = styled.p`
  grid-area: notes;
  margin: 12px 12px;
  color: #313366;
  font-size: 0.8rem;
`;

const StyledIntensity = styled.p`
  grid-area: intensity;
  align-self: start;
  margin: 6px 12px;
  text-align: right;
  font-weight: bold;
  font-size: 1rem;
  color: #313366;
`;
