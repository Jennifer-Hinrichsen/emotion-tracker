import { initialEntries } from "@/lib/entries";

export default function EmotionList() {
  return (
    <ul>
      {initialEntries.map((entry) => (
        <li key={entry.id}>
          <p>Type: {entry.emotion}</p>
          <p>Intensity: {entry.intensity}</p>
          <p>Notes: {entry.notes}</p>
          <p>Date and Time: {entry.dateTime}</p>
        </li>
      ))}
    </ul>
  );
}
