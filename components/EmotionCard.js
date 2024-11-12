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
  intensity,
}) {
  const { date, time } = formatDate(emotion.dateTime);

  return (
    <StyledCardWrapper>
      {isDetailsPage ? (
        <StyledOuterBox>
          <StyledTopBox>
            <StyledDate>{date}</StyledDate>
            <StyledTime>{time}</StyledTime>
          </StyledTopBox>
          <StyledEmotionCard>
            <EmotionCardContent emotion={emotion} />
            <BookmarkButton
              isBookmarked={isBookmarked}
              onToggleBookmark={() => onToggleBookmark(emotion.id)}
            />
          </StyledEmotionCard>
        </StyledOuterBox>
      ) : (
        <>
          <StyledLink key={emotion.id} href={`emotion/${emotion.id}`}>
            <StyledOuterBox>
              <StyledTopBox>
                <StyledDate>{date}</StyledDate>
                <StyledTime>{time}</StyledTime>
              </StyledTopBox>
              <StyledEmotionCard>
                <EmotionCardContent emotion={emotion} intensity={intensity} />
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
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px var(--color-shadow);
  margin: 16px 8px;
`;

const StyledTopBox = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: #e0e1f0;
  padding: 5px;
  border-radius: 4px 4px 0 0;
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
  padding: 10px;
  background-color: var(--color-background);
  border-radius: 8px;
  word-break: break-word;
`;
