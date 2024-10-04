import { initialEntries } from "@/lib/entries";

console.log(initialEntries);
export default function EmotionDetails({ emotion, onBack }) {
  return (
    <>
      <button type="button" aria-label="navigate-back" onClick={onBack}>
        ←
      </button>
      <h1>Emotion Details</h1>
      <div>
        <h2>Type: {emotion.emotion}</h2>
        <p>Intensity: {emotion.intensity}</p>
        <p>Date and Time: {emotion.dateTime}</p>
        <p>Notes: {emotion.notes}</p>
      </div>
    </>
  );
}
