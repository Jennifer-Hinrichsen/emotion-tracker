import { emotions } from "@/lib/emotions";
import { useState } from "react";

export default function EmotionForm() {
  const [selectedEmotion, setSelectedEmotion] = useState();

  const [selectedIntensity, setSelectedIntensity] = useState(5);

  const [selectedDateTime, setSelectedDateTime] = useState("");

  function handleEmotionChange(event) {
    setSelectedEmotion(event.target.value);
  }

  function handleIntensityChange(event) {
    setSelectedIntensity(event.target.value);
  }

  function handleDateTimeChange(event) {
    setSelectedDateTime(event.target.value);
  }

  return (
    <>
      <h2>Add new Emotion</h2>
      <form>
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
          type="datetime-local"
          value={selectedDateTime}
          onChange={handleDateTimeChange}
          required
        ></input>
      </form>
    </>
  );
}
