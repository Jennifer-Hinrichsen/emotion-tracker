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
  top: 10px;
  right: 10px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-10px) scale(1.1) rotate(-10deg);
  }

  &:active {
    transform: scale(0.9);
    box-shadow: 0 2px 5px;
  }
`;

const StyledBookmarkPinIcon = styled(BookmarkPinIcon)`
  color: ${(props) => (props.$isBookmarked ? "#3B9A8A" : "#000")};
`;
