import styled from "styled-components";
import { emotionsIcons } from "./EmotionIcons";

export default function EmotionCardContent({ object }) {
  return (
    <>
      <h2>{object.emotion}</h2>
      <StyledEmojiIcon>{emotionsIcons[object.emotion]}</StyledEmojiIcon>
      <p>Intensity: {object.intensity}</p>
      <p>Notes: {object.notes}</p>
      <StyledDateTime>{object.dateTime}</StyledDateTime>
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
