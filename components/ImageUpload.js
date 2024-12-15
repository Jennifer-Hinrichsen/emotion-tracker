import { useState } from "react";
import styled from "styled-components";

export default function ImageUpload({ onSubmit, imageUrl }) {
  const [showUploadButton, setShowUploadButton] = useState(false);

  const buttonText = imageUrl ? "Change your memory" : "Upload your memory";

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
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--color-button-primary);
  color: var(--color-text-light);
  border: 2px solid var(--color-frame);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;

  &:hover {
    background-color: var(--color-button-hover);
  }
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: var(--color-form-foreground);
  color: var(--color-background-cards);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;
