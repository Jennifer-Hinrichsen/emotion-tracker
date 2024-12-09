import styled from "styled-components";

export default function OptionsMenu({ onClose, emotion, onDeleteEmotion }) {
  function toggleDeleteDialog() {
    setIsDialogOpen(!isDialogOpen);
  }
  function handleDelete() {
    onDeleteEmotion(emotion._id);
    toggleDeleteDialog();
  }
  return (
    <StyledPopupMenu>
      <StyledCloseButton onClick={onClose}>×</StyledCloseButton>
      <StyledButtonDelete onClick={handleDelete}>Delete</StyledButtonDelete>
      <StyledContent></StyledContent>
    </StyledPopupMenu>
  );
}

const StyledPopupMenu = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 8px;
  right: 16px;
  width: 30%;
  height: 50%;
  border-radius: 8px;
  background-color: var(--color-secondary);
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-background-cards);
  cursor: pointer;
`;

const StyledButtonDelete = styled.button`
  float: right;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c0392b;
  }
`;

const StyledContent = styled.div`
  margin-top: 2rem;
  color: var(--color-background-cards);
  text-align: center;

  p {
    margin: 0.5rem 0;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
