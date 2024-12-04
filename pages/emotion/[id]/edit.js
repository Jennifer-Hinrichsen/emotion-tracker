import EmotionForm from "@/components/EmotionForm";
import Heading from "@/components/Heading";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: emotion,
    error,
    isLoading,
  } = useSWR(`/api/emotionEntries/${id}`);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error || !emotion) {
    return <h1>Error loading emotionEntry: {error.message}</h1>;
  }

  // const existingEmotion = emotions.find((emotion) => emotion._id === id);

  async function handleEdit(inputData) {
    const response = await fetch(`/api/emotionEntries/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
    console.log("inputData", inputData);

    if (response.ok) {
      router.push(`/emotion/${id}`);
    }
  }

  // if (isLoading || !router.isReady) return null;

  return (
    <>
      <Heading>Edit Emotion</Heading>
      <EmotionForm
        defaultValue={emotion}
        onSubmit={handleEdit}
        onCancel={() => {
          router.push(`/emotion/${id}`);
        }}
        editMode
      />
    </>
  );
}
