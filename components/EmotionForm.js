import { emotions } from "@/lib/emotions";
import { useState } from "react";
import styled from "styled-components";

export default function EmotionForm({ onSubmit, defaultValue }) {
  const currentDateTime = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  const [formError, setFormError] = useState(""); // Error message if not all fields are filled out on submit
  const hasError = formError !== "";
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [selectedIntensity, setSelectedIntensity] = useState(
    defaultValue?.intensity || 5
  );

  // Trigger submit
  function handleSubmit(event) {
    event.preventDefault();
    // Validate: Emotion must be selected
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (!data.emotion) {
      setFormError("Please choose an emotion.");
      setSuccessMessage(""); // Reset success message
      return;
    }
    // Validate: DateTime must be set
    if (!data.dateTime) {
      setFormError("Please select a date and time.");
      setSuccessMessage(""); // Reset success message
      return;
    }

    onSubmit(data);

    // Reset form
    setFormError("");
    setSuccessMessage("Emotion successfully added!"); // Set success message
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  }

  return (
    <>
      <StyledSubheadline>
        {defaultValue ? "Update your Emotion:" : "Add your Emotion:"}
      </StyledSubheadline>
      <StyledEmotionForm onSubmit={handleSubmit}>
        {/* Dynamic label for emotion, red only after form submission if no emotion is selected */}
        <label htmlFor="emotion" $hasError={hasError}>
          Emotion (type)*
        </label>
        <select
          defaultValue={defaultValue?.emotion || ""}
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
          onChange={(event) => {
            setSelectedIntensity(event.target.value);
          }}
          type="range"
          min="1"
          max="10"
          step="1"
        />
        <p>{selectedIntensity}</p>

        {/* Dynamic label for date and time, turns red when all cleared */}
        <label htmlFor="date-time" $hasError={!defaultValue?.dateTime}>
          Date and Time*
        </label>
        <input
          id="date-time"
          name="dateTime"
          type="datetime-local"
          defaultValue={defaultValue?.dateTime || currentDateTime}
        />

        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          defaultValue={defaultValue?.notes || ""}
          placeholder="Please describe your feelings"
          maxLength="150"
        ></textarea>

        <button type="submit">{defaultValue ? "Save" : "Submit"}</button>

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

// const StyledLabel = styled.label`
//   color: ${(props) => (props.$hasError ? "#ff0000" : "#000000")};
//   font-weight: ${(props) => (props.$hasError ? "bold" : "normal")};
// `;

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
