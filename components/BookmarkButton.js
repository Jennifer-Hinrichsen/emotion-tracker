import styled from "styled-components";
import BookmarkPinIcon from "assets/bookmarkicons/BookmarkPinIcon.svg";

export default function BookmarkButton({ isBookmarked, onToggleBookmark }) {
  return (
    <StyledButton onClick={onToggleBookmark} aria-label="Toggle Bookmark">
      <StyledBookmarkPinIcon $isBookmarked={isBookmarked} />
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

const StyledBookmarkPinIcon = styled(BookmarkPinIcon)`
  color: ${(props) => (props.$isBookmarked ? "#000" : "#808080")};
`;
