import EmotionForm from "@/components/EmotionForm";
import Heading from "@/components/Heading";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function EditPage({ onUpdateEmotion, customEmotionTypes }) {
  const router = useRouter();
  const { id } = router.query;

  const { data: emotions, error, isLoading } = useSWR("/api/emotionEntries");

  const existingEmotion = emotions.find((emotion) => emotion._id === id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error || !emotions) {
    return <h1>Error loading emotionEntries: {error.message}</h1>;
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
        customEmotionTypes={customEmotionTypes}
      />
    </>
  );
}
