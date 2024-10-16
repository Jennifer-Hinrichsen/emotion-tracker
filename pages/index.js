import Heading from "@/components/Heading";
import EmotionForm from "@/components/EmotionForm";
import EmotionList from "@/components/EmotionList";

export default function HomePage({ objects, onCreateEmotion }) {
  return (
    <div>
      <Heading>Emotion Tracker</Heading>
      <EmotionForm objects={objects} onSubmit={onCreateEmotion} />
      <EmotionList objects={objects} />
    </div>
  );
}
