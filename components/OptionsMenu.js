import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";

export default function OptionsMenu({ onClose, onDeleteEmotion, emotion }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      <StyledLink key={emotion._id} href={`emotion/${emotion._id}`}>
        Show Details
      </StyledLink>
      <StyledButtonDelete type="button" onClick={toggleDeleteDialog}>
        Delete Card
      </StyledButtonDelete>

      {isDialogOpen && (
        <StyledDialogOverlay>
          <StyledDialogBox>
            <p>Are you sure you want to delete this emotion card?</p>
            <StyledButtonConfirm onClick={handleDelete}>
              Yes
            </StyledButtonConfirm>
            <StyledButtonCancel onClick={toggleDeleteDialog}>
              No
            </StyledButtonCancel>
          </StyledDialogBox>
        </StyledDialogOverlay>
      )}
    </StyledPopupMenu>
  );
}

const StyledPopupMenu = styled.div`
  position: absolute;
  z-index: 1;
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
  top: 0.125rem;
  right: 0.125rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-background-cards);
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  float: right;
  margin-top: 24px;
  padding: 4px 24px;
  color: var(--color-background-cards);
  cursor: pointer;
  font-size: 0.5rem;
`;

const StyledButtonDelete = styled.button`
  float: right;
  margin: 4px;
  padding: 4px 24px;
  background-color: #e74c3c;
  color: var(--color-background-cards);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.5rem;
`;

const StyledDialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDialogBox = styled.div`
  background: var(--color-background);
  padding: 20px;
  margin: 12px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 10px var(--color-shadow);
`;

const StyledButtonConfirm = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledButtonCancel = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #95a5a6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
