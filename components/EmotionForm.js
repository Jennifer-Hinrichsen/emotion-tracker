import { emotions } from "@/lib/emotions";
import { useState } from "react";

export default function EmotionForm() {
  const [selectedEmotion, setSelectedEmotion] = useState();

  function handleEmotionChange(event) {
    setSelectedEmotion(event.target.value);
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
      </form>
    </>
  );
}
