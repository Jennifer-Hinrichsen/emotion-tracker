import Heading from "@/components/Heading";
import EmotionForm from "@/components/EmotionForm";
import EmotionList from "@/components/EmotionList";

export default function HomePage({ entries, onCreateEmotion }) {
  return (
    <div>
      <Heading>Emotion Tracker</Heading>
      <EmotionForm onCreateEmotion={onCreateEmotion} />
      <EmotionList entries={entries} />
    </div>
  );
}
