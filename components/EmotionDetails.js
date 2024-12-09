import EmotionCard from "./EmotionCard";
import Heading from "./Heading";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";

export default function EmotionDetails({
  emotion,
  onDeleteEmotion,
  myBookmarkedEmotions,
  onToggleBookmark,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function toggleDeleteDialog() {
    setIsDialogOpen(!isDialogOpen);
  }

  function handleDelete() {
    onDeleteEmotion(emotion._id);
    toggleDeleteDialog();
  }

  async function shareEmotion() {
    const shareData = {
      title: "Emotion Card",
      text: `I'm feeling ${emotion.type.name} with intensity ${
        emotion.intensity
      }. Note: ${emotion.notes || ""}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert("Sharing is not supported in this browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Failed to share. Please try again.");
    }
  }

  return (
    <>
      <Heading>Emotion Details</Heading>
      <StyledBackLink aria-label="navigate-home" href="/">
        ←
      </StyledBackLink>

      <EmotionCard
        emotion={emotion}
        onToggleBookmark={onToggleBookmark}
        isBookmarked={myBookmarkedEmotions.includes(emotion._id)}
        isDetailsPage={true}
        intensity={emotion.intensity}
      />
      <StyledEditLink href={`/emotion/${emotion._id}/edit`}>
        Edit
      </StyledEditLink>

      <StyledButtonDelete type="button" onClick={toggleDeleteDialog}>
        Delete
      </StyledButtonDelete>
      <StyledButtonShare type="button" onClick={shareEmotion}>
        Share
      </StyledButtonShare>

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

const StyledBackLink = styled(Link)`
  font-size: 24px;
  margin-left: 10px;
  text-decoration: none;
  color: var(--color-secondary);
`;

const StyledEditLink = styled(Link)`
  float: left;
  margin-right: 20px;
  margin: 10px;
  padding: 10px 20px;
  background-color: #6666ff;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
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
const StyledButtonShare = styled.button`
  float: right;
  margin-right: 20px;
  margin: 10px;
  padding: 10px 20px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #27ae60;
  }
`;
