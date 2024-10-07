import { emotions } from "@/lib/emotions";
import { useState } from "react";

export default function EmotionForm({ onCreateEmotion }) {
  const [selectedEmotion, setSelectedEmotion] = useState();

  const [selectedIntensity, setSelectedIntensity] = useState(5);

  const [selectedDateTime, setSelectedDateTime] = useState("");

  const [notes, setNotes] = useState("");

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
    setSelectedIntensity("");
    setSelectedDateTime("");
    setNotes("");
  }

  return (
    <>
      <h2>Add new Emotion</h2>
      <form onSubmit={handleSubmit}>
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
      </form>
    </>
  );
}
