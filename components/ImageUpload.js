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
    <form onSubmit={handleSubmit}>
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
      <StyledLabel htmlFor="image">{buttonText}</StyledLabel>
      <StyledInput
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleShowButton}
        required
      />
      {showUploadButton && <StyledButton type="submit">Upload</StyledButton>}
    </form>
  );
}

const StyledLabel = styled.label`
  margin: 10px;
  padding: 10px 20px;
  background-color: var(--color-form-foreground);
  color: var(--color-background-cards);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-button-hover);
  }
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledButton = styled.button`
  margin: 10px;
  padding: 8px 8px;
  background-color: var(--color-form-foreground);
  color: var(--color-background-cards);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const StyledImageContainer = styled.div`
  border-radius: 50%;
  overflow: hidden; /* Verhindert, dass das Bild aus dem Container hinausragt */
  width: 200px;
  height: 200px; /* Festgelegte Größe des Containers */
  display: flex;
  align-items: center; /* Zentriert das Bild vertikal */
  justify-content: center; /* Zentriert den Container */
  border: 2px solid var(--color-frame);
  margin: 0 auto; /* Zentriert den Container */
`;

const StyledImage = styled(Image)`
  object-fit: cover; /* Bild skaliert proportional */
  width: 100%;
  height: 100%;
`;
