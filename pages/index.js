import EmotionList from "@/components/EmotionList";
import Heading from "@/components/Heading";
import EmotionForm from "@/components/EmotionForm";
import { initialEntries } from "@/lib/entries";
import { useState } from "react";

export default function HomePage() {
  const [entries, setEntries] = useState(initialEntries);

  function handleCreateEmotion(newEmotion) {
    setEntries((prevEntries) => [
      { id: String(prevEntries.length + 1), ...newEmotion },
      ...prevEntries,
    ]);
  }
  return (
    <div>
      <Heading>Emotion Tracker</Heading>
      <EmotionForm onCreateEmotion={handleCreateEmotion} />
      <EmotionList entries={entries} />
    </div>
  );
}
