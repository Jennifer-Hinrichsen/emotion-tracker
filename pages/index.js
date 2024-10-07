import EmotionList from "@/components/EmotionList";
import Heading from "@/components/Heading";
import EmotionForm from "@/components/EmotionForm";

export default function HomePage() {
  return (
    <div>
      <Heading>Emotion Tracker</Heading>
      <EmotionForm />
      <EmotionList />
    </div>
  );
}
