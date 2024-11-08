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
}) {
  return (
    <StyledCardWrapper>
      {isDetailsPage ? (
        <StyledOuterBox>
          <StyledTopBox>
            <StyledDateTime>{formatDate(emotion.dateTime)}</StyledDateTime>
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
                <StyledDateTime>{formatDate(emotion.dateTime)}</StyledDateTime>
              </StyledTopBox>
              <StyledEmotionCard>
                <EmotionCardContent emotion={emotion} />
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
  background-color: #e0e1f0;
  border: 1px solid #d3d3d3;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px #000;
  margin: 16px 8px;
  padding: 10px 0 0 0;
`;

const StyledTopBox = styled.div`
  background-color: #e0e1f0;
  padding: 5px;
  border-radius: 4px 4px 0 0;
`;

const StyledDateTime = styled.p`
  align-self: flex-end;
  margin: 0;
  color: #313366;
`;

const StyledEmotionCard = styled.section`
  padding: 10px;
  background-color: #f9f9f9;

  border-radius: 8px;
`;
