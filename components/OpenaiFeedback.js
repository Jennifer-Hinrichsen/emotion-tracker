import useSWR from "swr";
import { useState } from "react";

export default function OpenaiFeedback({ emotion }) {
  const { mutate, isLoading } = useSWR(`/api/emotionEntries/${emotion._id}`);
  const [showFeedback, setShowFeedback] = useState(false);
  const [apiOutput, setApiOutput] = useState(emotion.openaiFeedback || "");

  async function handleGenerateFeedback() {
    if (apiOutput) {
      setShowFeedback(true);
      return;
    }

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
      <button
        onClick={showFeedback ? toggleFeedback : handleGenerateFeedback}
        disabled={isLoading}
      >
        {isLoading
          ? "Generating..."
          : showFeedback
          ? "Hide Feedback"
          : "Get Feedback"}
      </button>
      {showFeedback && (
        <p>
          {isLoading
            ? "Loading feedback..."
            : apiOutput || "No feedback available."}
        </p>
      )}
    </>
  );
}
