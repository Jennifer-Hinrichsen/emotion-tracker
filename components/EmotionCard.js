import styled from "styled-components";
import BookmarkButton from "./BookmarkButton";
import Link from "next/link";
import EmotionCardContent from "./EmotionCardContent";

export default function EmotionCard({
  object,
  onToggleBookmark,
  isBookmarked,
  isDetailsPage = false,
}) {
  return (
    <StyledCardWrapper>
      {isDetailsPage ? (
        <StyledEmotionCard>
          <EmotionCardContent object={object} />
          <BookmarkButton
            isBookmarked={isBookmarked}
            onToggleBookmark={() => onToggleBookmark(object.id)}
          />
        </StyledEmotionCard>
      ) : (
        <>
          <StyledLink key={object.id} href={`emotion/${object.id}`}>
            <StyledEmotionCard>
              <EmotionCardContent object={object} />
            </StyledEmotionCard>
          </StyledLink>
          <BookmarkButton
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
