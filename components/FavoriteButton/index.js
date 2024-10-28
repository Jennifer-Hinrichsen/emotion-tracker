import styled from "styled-components";

export default function FavoriteButton({ isBookmarked, onToggleBookmark }) {
  return (
    <StyledButton onClick={onToggleBookmark} aria-label="Toggle favorite">
      {isBookmarked ? "★" : "☆"}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  font-size: 24px;
  color: ${(props) => (props.isFavorite ? "#FFD700" : "#ccc")};
  background: none;
  border: none;
  cursor: pointer;
`;
