import styled from "styled-components";
import BookmarkButton from "./BookmarkButton";
import Link from "next/link";
import EmotionCardContent from "./EmotionCardContent";
import formatDate from "./TransformDateTime";

export default function EmotionCard({
  emotion,
  onToggleBookmark,
  isBookmarked,
  isDetailsPage = false,
  emotionTypes,
}) {
  const { date, time } = formatDate(emotion.dateTime);

  function getEmotionColor(type) {
    if (!emotionTypes || emotionTypes.length === 0) {
      return "var(--color-frame)";
    }

    const emotion = emotionTypes.find((item) => item.emotionType === type);
    return emotion ? emotion.color : "var(--color-frame)";
  }

  const emotionColor = getEmotionColor(emotion.emotionType);

  return (
    <StyledCardWrapper>
      {isDetailsPage ? (
        <StyledOuterBox color={emotionColor}>
          <StyledTopBox color={emotionColor}>
            <StyledDate>{date}</StyledDate>
            <StyledTime>{time}</StyledTime>
          </StyledTopBox>
          <StyledEmotionCard>
            <EmotionCardContent emotion={emotion} emotionTypes={emotionTypes} />
            <BookmarkButton
              isBookmarked={isBookmarked}
              onToggleBookmark={() => onToggleBookmark(emotion.id)}
            />
          </StyledEmotionCard>
        </StyledOuterBox>
      ) : (
        <>
          <StyledLink key={emotion.id} href={`emotion/${emotion.id}`}>
            <StyledOuterBox color={emotionColor}>
              <StyledTopBox color={emotionColor}>
                <StyledDate>{date}</StyledDate>
                <StyledTime>{time}</StyledTime>
              </StyledTopBox>
              <StyledEmotionCard>
                <EmotionCardContent
                  emotion={emotion}
                  emotionTypes={emotionTypes}
                />
              </StyledEmotionCard>
            </StyledOuterBox>
          </StyledLink>
          <BookmarkButton
            isBookmarked={isBookmarked}
            onToggleBookmark={() => onToggleBookmark(emotion.id)}
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

const StyledOuterBox = styled.div`
  background-color: var(--color-background);
  border: 1px solid ${({ color }) => color || "var(--color-border)"};
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px var(--color-shadow);
  margin: 24px 8px;
  overflow: hidden;
`;

const StyledTopBox = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: ${({ color }) => color || "var(--color-background)"};
  padding: 5px;
`;

const StyledDate = styled.p`
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: var(--color-secondary);
`;

const StyledTime = styled.p`
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: var(--color-secondary);
`;

const StyledEmotionCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: left;
  font-size: 1rem;
  margin: 16px 8px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  word-break: break-word;
`;
