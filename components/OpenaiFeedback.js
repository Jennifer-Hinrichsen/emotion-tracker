import useSWR from "swr";
import { useState } from "react";

export default function OpenaiFeedback({ emotion }) {
  const { mutate, isLoading } = useSWR(`/api/emotionEntries/${emotion._id}`);
  const [showFeedback, setShowFeedback] = useState(false);
  const [apiOutput, setApiOutput] = useState(emotion.openaiFeedback || "");

  async function handleGenerateFeedback() {
    // Prevent generating feedback if it already exists
    if (apiOutput) {
      setShowFeedback(true); // Show existing feedback
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
          body: JSON.stringify(emotion), // Emotion data as JSON
        }
      );

      if (response.ok) {
        const data = await response.json();
        setApiOutput(data.output); // Save the feedback in state
        mutate(); // Update SWR data
        setShowFeedback(true); // Show feedback after successful generation
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
      {showFeedback ? (
        <button onClick={toggleFeedback} disabled={isLoading}>
          Hide Feedback
        </button>
      ) : (
        <button onClick={handleGenerateFeedback} disabled={isLoading}>
          {isLoading ? "Generating..." : "Get Feedback"}
        </button>
      )}
      {showFeedback && (
        <>
          {isLoading ? (
            <p>Loading feedback...</p>
          ) : apiOutput ? (
            <p>{apiOutput}</p>
          ) : (
            <p>No feedback available.</p>
          )}
        </>
      )}
    </>
  );
}
