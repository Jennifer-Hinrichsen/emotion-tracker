import styled from "styled-components";
import BookmarkIcon from "assets/bookmarkicons/Bookmark.svg";
import BookmarkIconFilled from "assets/bookmarkicons/Bookmark-filled.svg";

export default function BookmarkButton({ isBookmarked, onToggleBookmark }) {
  return (
    <StyledButton
      onClick={onToggleBookmark}
      aria-label="Toggle Bookmark"
      isBookmarked={isBookmarked}
    >
      {isBookmarked ? <BookmarkIconFilled /> : <BookmarkIcon />}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  position: absolute;
  top: -16px;
  right: 5px;
  width: 48px;
  height: 48px;
  background: none;
  border: none;
  cursor: pointer;
  touch-action: manipulation;
  color: ${(props) =>
    props.isBookmarked ? "var(--color-cards-foreground)" : "inherit"};
  body.dark-theme & {
    color: ${(props) =>
      props.isBookmarked ? "var(--color-secondary)" : "inherit"};
  }
`;
