import useSWR from "swr";
import { useState } from "react";
import styled from "styled-components";
import InfoIcon from "../assets/buttons/info-circle.svg";

export default function OpenaiFeedback({ emotion }) {
  const { mutate, isLoading } = useSWR(`/api/emotionEntries/${emotion._id}`);
  const [showFeedback, setShowFeedback] = useState(false);
  const [apiOutput, setApiOutput] = useState(emotion.openaiFeedback || "");

  async function handleGenerateFeedback() {
    try {
      const response = await fetch(
        `/api/emotionEntries/${emotion._id}/feedback-generation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emotion),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setApiOutput(data.output);
        mutate();
        setShowFeedback(true);
      } else {
        console.error("Feedback generation failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during feedback generation:", error.message);
    }
  }

  function toggleFeedback() {
    setShowFeedback(!showFeedback);
  }

  return (
    <>
      <StyledContainer>
        <StyledButton
          isVisible={showFeedback} // Prop übergeben
          onClick={showFeedback ? toggleFeedback : handleGenerateFeedback}
          disabled={isLoading}
        >
          <StyledInfoIcon />
          {isLoading
            ? "Generating..."
            : showFeedback
            ? "Hide Emotional Tip"
            : "Emotional Tip"}
        </StyledButton>
        {showFeedback && (
          <StyledOutput>
            {isLoading
              ? "Loading feedback..."
              : apiOutput || "No feedback available."}
          </StyledOutput>
        )}
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center; /* Vertikale Zentrierung der Items */
  gap: 8px; /* Optional, Abstand zwischen den Items */
  flex-direction: column;
`;

const StyledInfoIcon = styled(InfoIcon)`
  margin: 1px 8px 1px 0px;
`;

const StyledButton = styled.button`
  width: auto; /* Breite automatisch an den Text anpassen */
  margin-left: ${(props) =>
    props.isVisible ? "40px" : "unset"}; /* Dynamisches Styling */
  max-width: 210px; /* Maximalbreite festlegen */
  min-width: 0; /* Verhindert eine Mindestbreite, die größer als der Text sein könnte */
  padding: 4px 16px;
  font-size: 16px;
  background-color: var(--color-dropdown-background);
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StyledOutput = styled.p`
  padding-left: 95px;
  margin-top: 8px;
  color: var(--color-secondary);
  font-size: 0.8rem;
`;
