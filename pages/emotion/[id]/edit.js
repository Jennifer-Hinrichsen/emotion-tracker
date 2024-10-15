import EmotionForm from "@/components/EmotionForm";
import Heading from "@/components/Heading";
import { useRouter } from "next/router";

export default function EditPage({ objects, onUpdateEmotion }) {
  const router = useRouter();
  const { id } = router.query;

  const existingEmotion = objects.find((object) => object.id === id);
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
          router.push(`/emotion/${id}`);
        }}
        onCancel={() => {
          router.push(`/emotion/${id}`);
        }}
      />
    </>
  );
}
