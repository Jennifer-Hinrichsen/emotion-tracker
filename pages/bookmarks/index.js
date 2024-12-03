import EmotionCard from "@/components/EmotionCard";
import Heading from "@/components/Heading";
import styled from "styled-components";
import useSWR from "swr";

export default function BookmarksPage({
  myBookmarkedEmotions,
  onToggleBookmark,
}) {
  const { data: emotions, error, isLoading } = useSWR("/api/emotionEntries");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error || !emotions) {
    return <h1>Error loading emotionEntries: {error.message}</h1>;
  }

  const bookmarkedEmotions = emotions.filter((emotion) =>
    myBookmarkedEmotions.includes(emotion._id)
  );

  return (
    <>
      <Heading>My Emotions</Heading>
      <StyledList>
        {bookmarkedEmotions.length > 0 ? (
          bookmarkedEmotions.map((emotion) => (
            <EmotionCard
              key={emotion._id}
              emotion={emotion}
              onToggleBookmark={onToggleBookmark}
              isBookmarked={true}
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
