import { emotions } from "@/lib/emotions";
import { useState } from "react";
import styled from "styled-components";

export default function EmotionForm({ onCreateEmotion }) {
  const [selectedEmotion, setSelectedEmotion] = useState();

  const [selectedIntensity, setSelectedIntensity] = useState(5);

  const currentDateTime = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);
  const [selectedDateTime, setSelectedDateTime] = useState(currentDateTime);

  const [notes, setNotes] = useState("");

  // function handleChange(event) {
  //   setSelectedEmotion(event.target.value);
  //   setSelectedIntensity(event.target.value);
  //   setSelectedDateTime(event.target.value);
  //   setNotes(event.target.value);
  // }

  function handleEmotionChange(event) {
    setSelectedEmotion(event.target.value);
  }

  function handleIntensityChange(event) {
    setSelectedIntensity(event.target.value);
  }

  function handleDateTimeChange(event) {
    setSelectedDateTime(event.target.value);
  }

  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newEmotionEntry = {
      emotion: selectedEmotion,
      intensity: selectedIntensity,
      dateTime: selectedDateTime,
    };
    onCreateEmotion(newEmotionEntry);
    event.target.reset();
    setSelectedEmotion("");
    setSelectedIntensity("5");
    setSelectedDateTime(currentDateTime);
    setNotes("");
  }

  return (
    <>
      <StyledSubheadline>Add new Emotion</StyledSubheadline>
      <StyledEmotionForm onSubmit={handleSubmit}>
        <label htmlFor="emotion">Emotion (Type)*</label>
        <select
          value={selectedEmotion}
          onChange={handleEmotionChange}
          id="emotion"
          name="emotion"
          required
        >
          <option value="">---Choose an emotion---</option>
          {emotions.map((emotion, index) => {
            return (
              <option key={index} value={emotion}>
                {emotion}
              </option>
            );
          })}
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
          required
        ></input>
        <p>{selectedIntensity}</p>
        <label htmlFor="date-time">Date and Time*</label>
        <input
          id="date-time"
          name="date-time"
          type="datetime-local"
          value={selectedDateTime}
          onChange={handleDateTimeChange}
          required
        ></input>
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={notes}
          placeholder="Please describe your feelings"
          maxLength="150"
          onChange={handleNotesChange}
        ></textarea>
        <button type="submit"> Submit</button>
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

  textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #d3d3d3;
  }
`;
