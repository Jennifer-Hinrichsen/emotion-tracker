import EmotionCard from "./EmotionCard";
import Heading from "./Heading";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";

export default function EmotionDetails({ entry, onDeleteEmotion }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage delete-dialog visibility

  // Function to open the confirmation dialog
  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  // Function to close the confirmation dialog
  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  // Function to handle the deletion of the entry
  function handleDelete() {
    onDeleteEmotion(entry.id); // Call the delete function passed as a prop
    handleCloseDialog(); // Close dialog after deleting
  }

  return (
    <>
      <Heading>Emotion Details</Heading>
      <StyledLink aria-label="navigate-home" href="/">
        ←
      </StyledLink>
      <EmotionCard entry={entry} />
      <StyledButtonDelete type="button" onClick={handleOpenDialog}>
        Delete
      </StyledButtonDelete>

      {/* Conditional rendering of the delete-dialog */}
      {isDialogOpen && (
        <StyledDialogOverlay>
          <StyledDialogBox>
            <h2>Are you sure you want to delete this entry?</h2>
            <StyledButtonConfirm type="button" onClick={handleDelete}>
              Delete
            </StyledButtonConfirm>
            <StyledButtonCancel type="button" onClick={handleCloseDialog}>
              Cancel
            </StyledButtonCancel>
          </StyledDialogBox>
        </StyledDialogOverlay>
      )}
    </>
  );
}

// Styled Components //
const StyledLink = styled(Link)`
  font-size: 24px;
  margin-left: 10px;
  text-decoration: none;
  color: #000;
`;

const StyledContainer = styled.div`
  font-size: 1rem;
  margin: 16px 8px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  list-style: none;
`;

const StyledButtonDelete = styled.button`
  float: right;
  margin-right: 20px;
  margin: 10px;
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
  background: #fff;
  padding: 20px;
  margin: 12px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const StyledButtonConfirm = styled.button`
  margin: 10px;
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

const StyledButtonCancel = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #95a5a6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #7f8c8d;
  }
`;
