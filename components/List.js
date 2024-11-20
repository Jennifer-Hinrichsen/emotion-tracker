import styled from "styled-components";
import EmotionCard from "./EmotionCard";

export default function EmotionList({
  emotions,
  selectedFilterButton,
  onToggleBookmark,
  myBookmarkedEmotions,
  customEmotionTypes,
}) {
  const filteredEmotions = selectedFilterButton
    ? emotions.filter((emotion) => emotion.emotionType === selectedFilterButton)
    : emotions;

  return (
    <>
      {filteredEmotions.length === 0 ? (
        <StyledMessage>
          At the moment there are no emotions in the list. Please add an
          emotion.
        </StyledMessage>
      ) : (
        <StyledUlContainer>
          {filteredEmotions.map((emotion) => (
            <StyledCardList key={emotion.id}>
              <EmotionCard
                emotion={emotion}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={myBookmarkedEmotions.includes(emotion.id)}
                customEmotionTypes={customEmotionTypes}
              />
            </StyledCardList>
          ))}
        </StyledUlContainer>
      )}
    </>
  );
}

const StyledMessage = styled.p`
  text-align: center;
  color: #777;
  font-size: 1.1rem;
  padding: 24px 16px;
`;

const StyledUlContainer = styled.ul`
  padding: 0;
`;

const StyledCardList = styled.li`
  list-style-type: none;
`;
