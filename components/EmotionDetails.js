import { initialEntries } from "@/lib/entries";

console.log(initialEntries);
export default function EmotionDetails({ emotion }) {
  return (
    <div>
      <h2>Type: {emotion.emotion}</h2>
      <p>Intensity: {emotion.intensity}</p>
      <p>Date and Time: {emotion.dateTime}</p>
      <p>Notes: {emotion.notes}</p>
    </div>
  );
}
