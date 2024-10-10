import EmotionDetails from "@/components/EmotionDetails";
import { useRouter } from "next/router";

export default function EmotionDetailPage({ entries, onDeleteEmotion }) {
  const router = useRouter();
  const { id } = router.query;

  const emotionEntry = entries?.find((emotion) => emotion.id === id);

  if (!id) {
    return <p>Loading...</p>;
  }

  if (!emotionEntry) {
    return <p>No emotion entry found.</p>;
  }
  function handleDelete() {
    onDeleteEmotion(id);
    router.push("/");
  }

  return (
    <EmotionDetails
      entry={emotionEntry}
      onDeleteEmotion={handleDelete}
      onDeleteEmotionBack={() => router.back()}
    />
  );
}
