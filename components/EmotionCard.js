import styled from "styled-components";
import { emotionsIcons } from "./EmotionIcons";
import FavoriteButton from "./FavoriteButton";

export default function EmotionCard({ object, onToggleBookmark }) {
  return (
    <StyledEmotionCard>
      <h2>{object.emotion}</h2>
      <StyledEmojiIcon>{emotionsIcons[object.emotion]}</StyledEmojiIcon>
      <p>Intensity: {object.intensity}</p>
      <p>Notes: {object.notes}</p>
      <StyledDateTime>{object.dateTime}</StyledDateTime>
      <FavoriteButton
        isBookmarked={object.isBookmarked}
        onToggleBookmark={() => onToggleBookmark(object.id)}
      />
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
