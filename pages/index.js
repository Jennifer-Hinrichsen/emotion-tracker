import { initialEntries } from "@/lib/entries";

export default function HomePage() {
  return (
    <div>
      <h1>Emotion Tracker</h1>
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
    </div>
  );
}
