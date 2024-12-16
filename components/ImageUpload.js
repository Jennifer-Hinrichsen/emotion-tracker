import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

export default function ImageUpload({ onSubmit, emotion }) {
  const [showMoreButtons, setShowMoreButtons] = useState(false);

  const buttonText = emotion.imageUrl
    ? "Change your memory"
    : "Upload your memory";

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
      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setShowMoreButtons(false);
        await onSubmit(data);
      } else {
        console.error("Upload failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during upload:", error.message);
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      {emotion.imageUrl && (
        <StyledImageContainer>
          <StyledImage
            src={emotion.imageUrl}
            width={200}
            height={200}
            alt="Uploaded image"
          />
        </StyledImageContainer>
      )}
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
      {showMoreButtons && (
        <ButtonContainer>
          <StyledButtonCancel type="button" onClick={handleCancel}>
            Cancel
          </StyledButtonCancel>
          <StyledButtonSave type="submit">Save</StyledButtonSave>
        </ButtonContainer>
      )}
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledImageContainer = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-frame);
  margin: 0 auto;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const StyledLabel = styled.label`
  margin: 0 4px -8px 0;
  padding: 10px 20px;
  margin-left: auto;
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
`;

const StyledInput = styled.input`
  display: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 8px;
`;

const StyledButtonSave = styled.button`
  margin: 10px 4px;
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

const StyledButtonCancel = styled.button`
  margin: 10px 0;
  padding: 5px 10px;
  background-color: #95a5a6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #7f8c8d;
  }

  &:hover {
    opacity: 70%;
  }
`;
