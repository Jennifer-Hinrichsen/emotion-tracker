import styled from "styled-components";
import { emotionsIcons } from "./EmotionIcons";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";

export default function EmotionCard({
  object,
  onToggleBookmark,
  isBookmarked,
  isDetailsPage = false,
}) {
  return (
    <StyledCardWrapper>
      {isDetailsPage ? (
        <>
          <StyledEmotionCard>
            <h2>{object.emotion}</h2>
            <StyledEmojiIcon>{emotionsIcons[object.emotion]}</StyledEmojiIcon>
            <p>Intensity: {object.intensity}</p>
            <p>Notes: {object.notes}</p>
            <StyledDateTime>{object.dateTime}</StyledDateTime>
            <FavoriteButton
              isBookmarked={isBookmarked}
              onToggleBookmark={() => onToggleBookmark(object.id)}
            />
          </StyledEmotionCard>
        </>
      ) : (
        <>
          <StyledLink key={object.id} href={`emotion/${object.id}`}>
            <StyledEmotionCard>
              <h2>{object.emotion}</h2>
              <StyledEmojiIcon>{emotionsIcons[object.emotion]}</StyledEmojiIcon>
              <p>Intensity: {object.intensity}</p>
              <p>Notes: {object.notes}</p>
              <StyledDateTime>{object.dateTime}</StyledDateTime>
            </StyledEmotionCard>
          </StyledLink>
          <FavoriteButton
            isBookmarked={isBookmarked}
            onToggleBookmark={() => onToggleBookmark(object.id)}
          />
        </>
      )}
    </StyledCardWrapper>
  );
}

const StyledCardWrapper = styled.div`
  position: relative;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  &:visited {
    color: inherit;
  }
`;

const StyledEmotionCard = styled.section`
  position: relative;
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
