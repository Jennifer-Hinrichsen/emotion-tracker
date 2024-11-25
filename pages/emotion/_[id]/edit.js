import EmotionForm from "@/components/EmotionForm";
import Heading from "@/components/Heading";
import { useRouter } from "next/router";

export default function EditPage({
  emotions,
  onUpdateEmotion,
  customEmotionTypes,
}) {
  const router = useRouter();
  const { id } = router.query;

  const existingEmotion = emotions.find((emotion) => emotion._id === id);
  if (!existingEmotion) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Heading>Edit Emotion</Heading>
      <EmotionForm
        defaultValue={existingEmotion}
        onSubmit={(data) => {
          onUpdateEmotion({ ...data, id });
          router.push(`/emotion/${_id}`);
        }}
        onCancel={() => {
          router.push(`/emotion/${_id}`);
        }}
        customEmotionTypes={customEmotionTypes}
      />
    </>
  );
}
