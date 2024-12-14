import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import Image from "next/image";
import styled from "styled-components";

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useLocalStorageState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [ButtonText, setButtonText] = useLocalStorageState("buttonText", {
    defaultValue: "Upload your memory",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json(); // Erwartet, dass das Backend die Cloudinary-Daten zurückgibt
        setImageUrl(data.secure_url);
        setShowUploadButton(false);
        setButtonText("Change your memory");
      } else {
        console.error("Upload fehlgeschlagen:", await response.text());
      }
    } catch (error) {
      console.error("Fehler beim Upload:", error.message);
    }
  }

  function handleImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      setShowUploadButton(true);
    } else {
      setShowUploadButton(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <StyledLabel htmlFor="image" role="button">
          {ButtonText}
        </StyledLabel>
        <StyledInput
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {showUploadButton && <StyledButton type="submit">Upload</StyledButton>}
      </form>

      {imageUrl && (
        <StyledImageContainer>
          <StyledImage
            src={imageUrl}
            width={200}
            height={200}
            alt="personalized image"
          />
        </StyledImageContainer>
      )}
    </>
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
  display: none; /* Versteckt das Standard-Input-Feld */
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

  /* &:hover {
    background-color: var(--color-button-success);
  } */
`;

const StyledImageContainer = styled.div`
  border-radius: 50%;
  overflow: hidden; /* Verhindert, dass das Bild aus dem Container hinausragt */
  width: 200px;
  height: 200px; /* Festgelegte Größe des Containers */
  display: flex;
  align-items: center; /* Zentriert das Bild vertikal */
  justify-content: center; /* Zentriert das Bild horizontal */
  border: 2px solid var(--color-frame);
  margin: 0 auto; /* Zentriert den Container innerhalb der übergeordneten Ebene */
`;

const StyledImage = styled(Image)`
  object-fit: cover; /* Bild skaliert proportional und füllt den Container aus */
  width: 100%;
  height: 100%;
`;
