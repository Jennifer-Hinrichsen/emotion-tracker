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

  async function handleEdit(inputData) {
    const response = await fetch(`/api/emotionEntries/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    if (response.ok) {
      router.push(`/emotion/${id}`);
    }
  }

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
