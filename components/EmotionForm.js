import { emotions } from "@/lib/emotions";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function EmotionForm({ onSubmit, defaultValue, onCancel }) {
  const currentDateTime = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  const [formError, setFormError] = useState("");
  const hasError = formError !== "";
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedIntensity, setSelectedIntensity] = useState(
    defaultValue?.intensity || 5
  );

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (!data.emotion) {
      setFormError("Please choose an emotion.");
      setSuccessMessage("");
      return;
    }

    if (!data.dateTime) {
      setFormError("Please select a date and time.");
      setSuccessMessage("");
      return;
    }

    onSubmit(data);

    setFormError("");
    setSuccessMessage("Emotion successfully added!");

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
        {defaultValue && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
        {formError && <StyledError>{formError}</StyledError>}

        {successMessage && <StyledSuccess>{successMessage}</StyledSuccess>}
      </StyledEmotionForm>
    </>
  );
}

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
