import styled from "styled-components";
import EmotionCard from "./EmotionCard";

export default function EmotionList({
  objects,
  onToggleBookmark,
  myBookmarkedEmotions,
}) {
  return (
    <StyledEmotionList>
      {objects.length === 0 ? (
        <StyledMessage>
          At the moment there are no emotions in the list. Please add an
          emotion.
        </StyledMessage>
      ) : (
        objects.map((object) => (
          <li key={object.id}>
            <EmotionCard
              object={object}
              onToggleBookmark={onToggleBookmark}
              isBookmarked={myBookmarkedEmotions.includes(object.id)}
            />
          </li>
        ))
      )}
    </StyledEmotionList>
  );
}

const StyledEmotionList = styled.ul`
  padding: 0;
`;

const StyledMessage = styled.p`
  text-align: center;
  color: #777;
  font-size: 1.1rem;
  padding: 24px 16px;
`;
