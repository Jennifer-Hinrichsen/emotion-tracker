import styled from "styled-components";
import { emotionsIcons } from "./EmotionIcons";

export default function EmotionCardContent({ emotion }) {
  return (
    <StyledEmotionCardContent>
      <StyledEmojiIcon>{emotionsIcons[emotion.emotionType]}</StyledEmojiIcon>
      <StyledEmotionType>{emotion.emotionType}</StyledEmotionType>
      <StyledIntensity>{emotion.intensity}</StyledIntensity>
      <StyledNotes>{emotion.notes}</StyledNotes>
    </StyledEmotionCardContent>
  );
}

const StyledEmotionCardContent = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "emoji emotionType intensity"
    "emoji notes intensity";
  align-items: center;
  padding: 5px;

  @media (max-width: 374px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    grid-template-areas:
      "emoji"
      "emotionType"
      "notes"
      "intensity";
  }
`;

const StyledEmojiIcon = styled.span`
  grid-area: emoji;
  align-self: self-start;
  width: 50px;
  height: 50px;
  color: #313366;

  svg {
    stroke-width: 0.8px;
  }
`;

const StyledEmotionType = styled.p`
  grid-area: emotionType;
  margin: 0;
  padding-left: 28px;
  font-weight: bold 600;
  font-size: 1.2rem;
  color: #313366;
`;

const StyledNotes = styled.p`
  grid-area: notes;
  padding-left: 28px;
  color: #313366;
  font-size: 0.8rem;
  max-width: 100%;
`;

const StyledIntensity = styled.p`
  grid-area: intensity;
  align-self: start;
  margin: 6px 12px;
  text-align: right;
  font-weight: bold 600;
  font-size: 1.2rem;
  color: #313366;
`;
