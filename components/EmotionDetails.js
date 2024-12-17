import EmotionCard from "./EmotionCard";
import Heading from "./Heading";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import ShareButton from "./ShareButton";

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

  return (
    <>
      <Heading>Emotion Details</Heading>
      <StyledWrapperBackLink>
        <StyledBackLink aria-label="navigate-home" href="/">
          ←
        </StyledBackLink>
      </StyledWrapperBackLink>
      <EmotionCard
        emotion={emotion}
        onToggleBookmark={onToggleBookmark}
        isBookmarked={myBookmarkedEmotions.includes(emotion._id)}
        isDetailsPage={true}
        intensity={emotion.intensity}
      />
      <StyledEditLink
        href={`/emotion/${emotion._id}/edit`}
        aria-label={`Edit emotion details for ${emotion.type.name}`}
      >
        Edit
      </StyledEditLink>

      <StyledButtonDelete type="button" onClick={toggleDeleteDialog}>
        Delete
      </StyledButtonDelete>
      <ShareButton emotion={emotion} />

      {isDialogOpen && (
        <StyledDialogOverlay aria-label="Delete confirmation dialog">
          <StyledDialogBox>
            <h2>Are you sure you want to delete this emotion?</h2>
            <StyledButtonConfirm
              aria-label="Confirm emotion deletion"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </StyledButtonConfirm>
            <StyledButtonCancel
              type="button"
              onClick={toggleDeleteDialog}
              aria-label="Cancel emotion deletion"
            >
              Cancel
            </StyledButtonCancel>
          </StyledDialogBox>
        </StyledDialogOverlay>
      )}
    </>
  );
}

const StyledWrapperBackLink = styled.div`
  margin-bottom: 12px;
`;
const StyledBackLink = styled(Link)`
  font-size: 24px;
  margin-left: 10px;
  text-decoration: none;
  color: var(--color-secondary);
`;

const StyledEditLink = styled(Link)`
  line-height: 1;
  float: left;
  margin-right: 20px;
  margin: 10px;
  padding: 5px 10px;
  background-color: #6666ff;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #3232ff;
  }
`;

const StyledButtonDelete = styled.button`
  line-height: 1;
  float: right;
  margin-right: 20px;
  margin: 10px;
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
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
