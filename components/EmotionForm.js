import { emotions } from "@/lib/emotions";
import { useState } from "react";
import styled from "styled-components";

export default function EmotionForm({ onCreateEmotion }) {
  const currentDateTime = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [selectedIntensity, setSelectedIntensity] = useState(5);
  const [selectedDateTime, setSelectedDateTime] = useState(currentDateTime);
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState(""); // Error message if not all fields are filled out on submit
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [hasError, setHasError] = useState(false); // New state variable for styling

  // Change emotion
  function handleEmotionChange(event) {
    setSelectedEmotion(event.target.value);
    if (event.target.value !== "") {
      setFormError(""); // Reset error message when the field is filled
      setHasError(false); // Reset styling once an emotion is selected
    }
  }

  // Change intensity
  function handleIntensityChange(event) {
    setSelectedIntensity(event.target.value);
  }

  // Change dateTime
  function handleDateTimeChange(event) {
    setSelectedDateTime(event.target.value);
    if (event.target.value) {
      setFormError(""); // Reset error message when date/time is selected
    }
  }

  // Save notes
  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  // Trigger submit
  function handleSubmit(event) {
    event.preventDefault();
    // Validate: Emotion must be selected
    if (!selectedEmotion) {
      setFormError("Please fill in the required fields.");
      setHasError(true); // Set error state for styling
      setSuccessMessage(""); // Reset success message
      return;
    }
    // Validate: DateTime must be set
    if (!selectedDateTime) {
      setFormError("Please select a date and time.");
      setSuccessMessage(""); // Reset success message
      return;
    }

    // New object
    const newEmotionEntry = {
      emotion: selectedEmotion,
      intensity: selectedIntensity,
      dateTime: selectedDateTime,
      notes: notes,
    };
    // Pass new object
    onCreateEmotion(newEmotionEntry);

    // Reset form
    setSelectedEmotion("");
    setSelectedIntensity(5);
    setSelectedDateTime(currentDateTime);
    setNotes("");
    setFormError(""); // Reset error message
    setHasError(false); // Reset error state for styling
    setSuccessMessage("Emotion successfully added!"); // Set success message
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  }

  return (
    <>
      <StyledSubheadline>Add new Emotion</StyledSubheadline>
      <StyledEmotionForm onSubmit={handleSubmit}>
        {/* Dynamic label for emotion, red only after form submission if no emotion is selected */}
        <StyledLabel htmlFor="emotion" $hasError={hasError}>
          Emotion (type)*
        </StyledLabel>
        <select
          value={selectedEmotion}
          onChange={handleEmotionChange}
          id="emotion"
          name="emotion"
        >
          <option value="">---Choose an emotion---</option>
          {emotions.map((emotion, index) => (
            <option key={index} value={emotion}>
              {emotion}
            </option>
          ))}
        </select>

        <label htmlFor="intensity">Emotion intensity*</label>
        <input
          id="intensity"
          name="intensity"
          value={selectedIntensity}
          onChange={handleIntensityChange}
          type="range"
          min="1"
          max="10"
          step="1"
        />
        <p>{selectedIntensity}</p>

        {/* Dynamic label for date and time, turns red when all cleared */}
        <StyledLabel htmlFor="date-time" $hasError={!selectedDateTime}>
          Date and Time*
        </StyledLabel>
        <input
          id="date-time"
          name="date-time"
          type="datetime-local"
          value={selectedDateTime}
          onChange={handleDateTimeChange}
        />

        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={notes}
          placeholder="Please describe your feelings"
          maxLength="150"
          onChange={handleNotesChange}
        ></textarea>

        <button type="submit">Submit</button>

        {/* Custom error message at the end of the form */}
        {formError && <StyledError>{formError}</StyledError>}
        {/* Success message at the end of the form */}
        {successMessage && <StyledSuccess>{successMessage}</StyledSuccess>}
      </StyledEmotionForm>
    </>
  );
}

// Styled Components //
const StyledSubheadline = styled.h2`
  text-align: center;
`;

const StyledEmotionForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  font-size: 1rem;
  margin: 16px 8px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
`;

const StyledLabel = styled.label`
  color: ${(props) => (props.$hasError ? "#ff0000" : "#000000")};
  font-weight: ${(props) => (props.$hasError ? "bold" : "normal")};
`;

const StyledError = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 8px;
`;

const StyledSuccess = styled.p`
  color: green;
  font-size: 0.9rem;
  margin-top: 8px;
`;
