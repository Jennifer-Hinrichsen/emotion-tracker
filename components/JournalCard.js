import styled from "styled-components";
import formatDate from "./TransformDateTime";
import { useState } from "react";

export default function JournalCard({ journalEntry, onDelete }) {
  const { date, time } = formatDate(journalEntry.date);
  const { subject, text } = journalEntry;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function toggleDeleteDialog() {
    setIsDialogOpen(!isDialogOpen);
  }

  function handleDelete() {
    onDelete();
    toggleDeleteDialog();
  }

  return (
    <StyledOuterBox>
      <StyledTopBox>
        <StyledDate>
          {date} {time}
        </StyledDate>
        <DeleteButton onClick={toggleDeleteDialog}>✕</DeleteButton>
      </StyledTopBox>
      <StyledJournalCard>
        <StyledTitle>{subject}</StyledTitle>
        <StyledText>{text}</StyledText>
      </StyledJournalCard>

      {isDialogOpen && (
        <StyledDialogOverlay aria-label="Delete confirmation dialog">
          <StyledDialogBox>
            <h2>Are you sure you want to delete this entry?</h2>
            <StyledButtonConfirm
              aria-label="Confirm deletion"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </StyledButtonConfirm>
            <StyledButtonCancel
              type="button"
              onClick={toggleDeleteDialog}
              aria-label="Cancel deletion"
            >
              Cancel
            </StyledButtonCancel>
          </StyledDialogBox>
        </StyledDialogOverlay>
      )}
    </StyledOuterBox>
  );
}

const StyledOuterBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: var(--color-background);
  border: 1px solid ${({ color }) => color || "var(--color-border)"};
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px var(--color-shadow);
  margin: 24px 0;
  overflow: hidden;
`;

const StyledTopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-highlighted-background);
  padding: 5px;
`;

const StyledDate = styled.p`
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: var(--color-cards-foreground);
`;

const StyledJournalCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  padding: 12px 8px;
  background-color: var(--color-background-cards);
  word-break: break-word;
  width: 100%;
`;

const StyledTitle = styled.h2`
  margin-top: -4px;
  color: var(--color-form-foreground);
  font-family: "Baskerville", serif;
  font-weight: normal;
`;

const StyledText = styled.p`
  margin-top: 0;
  text-align: center;
  color: var(--color-form-foreground);
  line-height: 1.4;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: var(--color-highlighted-foreground);
  font-size: 1rem;
  cursor: pointer;
  padding: 0 10px;

  &:hover {
    color: var(--color-form-foreground);
  }
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
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 10px var(--color-shadow);
  body.dark-theme & {
    color: var(--color-foreground);
  }
`;

const StyledButtonConfirm = styled.button`
  margin: 10px;
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const StyledButtonCancel = styled.button`
  margin: 10px;
  padding: 5px 10px;
  background-color: #95a5a6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #7f8c8d;
  }
`;
