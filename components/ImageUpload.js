import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

export default function ImageUpload({ onSubmit, emotion }) {
  const [showUploadButton, setShowUploadButton] = useState(false);

  const buttonText = emotion.imageUrl
    ? "Change your memory"
    : "Upload your memory";

  function handleShowButton(event) {
    if (event.target.files && event.target.files[0]) {
      setShowUploadButton(true);
    } else {
      setShowUploadButton(false);
    }
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
        setShowUploadButton(false);
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
      <StyledLabel $disabled={showUploadButton} htmlFor="image">
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
      {showUploadButton && <StyledButton type="submit">Save</StyledButton>}
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
  margin: 10px 4px -8px 0;
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

const StyledButton = styled.button`
  margin: 12px 4px -10px 0;
  padding: 10px 20px;
  margin-left: auto;
  background-color: var(--color-form-foreground);
  color: var(--color-background-cards);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;
