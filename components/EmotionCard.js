import styled from "styled-components";

import BookmarkButton from "./BookmarkButton";
import Link from "next/link";
import EmotionCardContent from "./EmotionCardContent";

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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 16px 8px;
  padding: 10px;
`;

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
