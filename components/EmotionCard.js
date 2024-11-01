import styled from "styled-components";

import BookmarkButton from "./BookmarkButton";
import Link from "next/link";
import EmotionCardContent from "./EmotionCardContent";

import { emotionsIcons } from "./EmotionIcons";
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
        <StyledEmotionCard>
          <EmotionCardContent emotion={emotion} />
          <BookmarkButton
            isBookmarked={isBookmarked}
            onToggleBookmark={() => onToggleBookmark(emotion.id)}
          />
        </StyledEmotionCard>
      ) : (
        <>
          <StyledLink key={emotion.id} href={`emotion/${emotion.id}`}>
            <StyledEmotionCard>
              <EmotionCardContent emotion={emotion} />
            </StyledEmotionCard>
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
