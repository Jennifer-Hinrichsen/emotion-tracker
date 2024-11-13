import styled from "styled-components";
import BookmarkIcon from "assets/bookmarkicons/Bookmark.svg";
import BookmarkIconFilled from "assets/bookmarkicons/Bookmark-filled.svg";

export default function BookmarkButton({ isBookmarked, onToggleBookmark }) {
  return (
    <StyledButton onClick={onToggleBookmark} aria-label="Toggle Bookmark">
      {isBookmarked ? (
        <StyledIcon as={BookmarkIconFilled} />
      ) : (
        <StyledIcon as={BookmarkIcon} />
      )}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  position: absolute;
  top: -10px;
  right: 5px;
  width: 48px;
  height: 48px;
  background: none;
  border: none;
  cursor: pointer;
  touch-action: manipulation;
`;

const StyledIcon = styled.div`
  width: 100%;
  height: 100%;
  color: #000;
  display: inline-block;
`;
