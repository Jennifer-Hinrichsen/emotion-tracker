import { useState } from "react";

export default function OpenaiFeedback() {
  const [showFeedback, setShowFeedback] = useState(false);

  function toggleFeedback() {
    setShowFeedback(!showFeedback);
  }

  return (
    <>
      <button onClick={toggleFeedback}>
        {showFeedback ? "Hide Feedback" : "Get Feedback"}
      </button>
      {showFeedback && <p>This is the feedback.</p>}
    </>
  );
}
