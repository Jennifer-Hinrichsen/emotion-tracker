import styled from "styled-components";
import { emotionsIcons } from "./EmotionIcons";
import formatDate from "./TransformDateTime";

export default function EmotionCardContent({ emotion, intensity }) {
  return (
    <>
      <h2>{emotion.emotionType}</h2>
      <StyledEmojiIcon>{emotionsIcons[emotion.emotionType]}</StyledEmojiIcon>
      <p>Intensity: {intensity}</p>
      <p>Notes: {emotion.notes}</p>
      <StyledDateTime>{formatDate(emotion.dateTime)}</StyledDateTime>
    </>
  );
}

const StyledEmojiIcon = styled.span`
  align-self: flex-end;
  width: 40px;
  height: 40px;
`;

const StyledDateTime = styled.p`
  align-self: flex-end;
`;
