import EmotionCard from "@/components/EmotionCard";
import Heading from "@/components/Heading";
import styled from "styled-components";

export default function BookmarksPage({
  emotions,
  myBookmarkedEmotions,
  onToggleBookmark,
  customEmotionTypes,
}) {
  const bookmarkedEmotions = emotions.filter((emotion) =>
    myBookmarkedEmotions.includes(emotion.id)
  );

  return (
    <>
      <Heading>My Emotions</Heading>
      <StyledList>
        {bookmarkedEmotions.length > 0 ? (
          bookmarkedEmotions.map((emotion) => (
            <EmotionCard
              customEmotionTypes={customEmotionTypes}
              key={emotion.id}
              emotion={emotion}
              onToggleBookmark={onToggleBookmark}
              $isBookmarked={true}
            />
          ))
        ) : (
          <StyledMessage>
            You have no bookmarked emotions anymore.
          </StyledMessage>
        )}
      </StyledList>
    </>
  );
}

const StyledList = styled.ul`
  margin-bottom: 48px;
  padding: 0 1rem;
`;
const StyledMessage = styled.p`
  color: var(--color-form-foreground);

  body.dark-theme & {
    color: var(--color-form-foreground);
  }
`;
