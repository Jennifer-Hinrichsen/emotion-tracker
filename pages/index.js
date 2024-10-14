import Heading from "@/components/Heading";
import EmotionForm from "@/components/EmotionForm";
import EmotionList from "@/components/EmotionList";

export default function HomePage({
  objects,
  onCreateEmotion,
  onUpdateEmotion,
}) {
  return (
    <div>
      <Heading>Emotion Tracker</Heading>
      <EmotionForm
        objects={objects}
        onCreateEmotion={onCreateEmotion}
        onUpdateEmotion={onUpdateEmotion}
        onSubmit={(data) => {
          onCreateEmotion({ ...data });
        }}
      />
      <EmotionList objects={objects} />
    </div>
  );
}
