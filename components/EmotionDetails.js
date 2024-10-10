import EmotionCard from "./EmotionCard";
import Heading from "./Heading";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";

export default function EmotionDetails({ entry, onDeleteEmotion }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }
  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  function handleDelete() {
    onDeleteEmotion(entry.id);
    handleCloseDialog(); // Close dialog after deleting
  }

  return (
    <>
      <Heading>Emotion Details</Heading>
      <StyledLink aria-label="navigate-home" href="/">
        ←
      </StyledLink>
      <EmotionCard entry={entry} />
      {/* Die ID des Eintrags muss übergeben werden */}
      <StyledButtonDelete type="button" onClick={handleOpenDialog}>
        Delete
      </StyledButtonDelete>

      {isDialogOpen && (
        <div>
          <div>
            <h2>Are you sure you want to delete this entry?</h2>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
            <button type="button" onClick={handleCloseDialog}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

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

const StyledDateTime = styled.p`
  text-align: right;
`;
const StyledButtonDelete = styled.button`
  float: right;
  margin-right: 20px;
`;
