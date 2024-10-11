import EmotionCard from "./EmotionCard";
import Heading from "./Heading";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";

export default function EmotionDetails({ object, onDeleteEmotion }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage delete-dialog visibility

  // Function to open the confirmation dialog
  function toggleDeleteDialog() {
    setIsDialogOpen(!isDialogOpen);
  }

  // Function to handle the deletion of the object
  function handleDelete() {
    onDeleteEmotion(object.id); // Call the delete function passed as a prop
    toggleDeleteDialog(); // toggle the dialog when clicking the delete button
  }

  return (
    <>
      <Heading>Emotion Details</Heading>
      <StyledLink aria-label="navigate-home" href="/">
        ←
      </StyledLink>
      <EmotionCard object={object} />
      <StyledButtonEdit type="button">Edit</StyledButtonEdit>
      <StyledButtonDelete type="button" onClick={toggleDeleteDialog}>
        Delete
      </StyledButtonDelete>

      {/* Conditional rendering of the delete-dialog */}
      {isDialogOpen && (
        <StyledDialogOverlay>
          <StyledDialogBox>
            <h2>Are you sure you want to delete this emotion?</h2>
            <StyledButtonConfirm type="button" onClick={handleDelete}>
              Delete
            </StyledButtonConfirm>
            <StyledButtonCancel type="button" onClick={toggleDeleteDialog}>
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

const StyledButtonEdit = styled.button`
  float: left;
  margin-right: 20px;
  margin: 10px;
  padding: 10px 20px;
  background-color: #6666ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3232ff;
  }
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
