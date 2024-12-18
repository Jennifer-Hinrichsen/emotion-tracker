import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import useSWR from "swr";

export default function ImageUpload({ emotion }) {
  const { mutate } = useSWR(`/api/emotionEntries/${emotion._id}`);
  const [showMoreButtons, setShowMoreButtons] = useState(false);

  const buttonText = emotion.imageUrl ? "Change memory" : "Upload memory";

  function handleShowButton(event) {
    if (event.target.files && event.target.files[0]) {
      setShowMoreButtons(true);
    } else {
      setShowMoreButtons(false);
    }
  }

  function handleCancel() {
    setShowMoreButtons(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch(
        `/api/emotionEntries/${emotion._id}/image-upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setShowMoreButtons(false);
        mutate();
      } else {
        console.error("Upload failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during upload:", error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <StyledLabel $disabled={showMoreButtons} htmlFor="image">
        {buttonText}
      </StyledLabel>
      <StyledInput
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleShowButton}
        required
      />
      <ButtonContainer>
        {showMoreButtons && (
          <>
            <StyledButtonCancel type="button" onClick={handleCancel}>
              Cancel
            </StyledButtonCancel>
            <StyledButtonSave type="submit">Save</StyledButtonSave>
          </>
        )}
      </ButtonContainer>
      {emotion.imageUrl && (
        <StyledImage
          src={emotion.imageUrl}
          width={200}
          height={200}
          alt="Uploaded image"
        />
      )}
    </form>
  );
}

const StyledLabel = styled.label`
  position: absolute;
  top: 30px;
  right: 19px;
  padding: 10px 20px;
  background-color: ${(props) =>
    props.$disabled
      ? "var(--color-home-icon-foreground)"
      : "var(--color-form-foreground)"};
  color: ${(props) =>
    props.$disabled
      ? "var(--color-background-cards)"
      : "var(--color-background-cards)"};
  border-radius: 5px;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 0.8rem;
  z-index: 10;
`;

const StyledInput = styled.input`
  display: none;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 30px;
  display: flex;
  gap: 10px;
`;

const StyledButtonCancel = styled.button`
  padding: 10px 20px;
  background-color: #95a5a6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: #7f8c8d;
  }
`;

const StyledButtonSave = styled.button`
  padding: 10px 20px;
  background-color: var(--color-form-foreground);
  color: var(--color-background-cards);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-button-success);
  }

  &.clicked {
    animation: greenFlash 6s forwards;
  }

  @keyframes greenFlash {
    0% {
      background-color: var(--color-form-foreground);
    }
    50% {
      background-color: var(--color-button-success);
    }
    100% {
      background-color: var(--color-form-foreground);
    }
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  margin-top: -19px;
  margin-bottom: 10px;
`;
