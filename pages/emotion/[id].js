import EmotionDetails from "@/components/EmotionDetails";
import { useRouter } from "next/router";

export default function EmotionDetailPage({ entries }) {
  const router = useRouter();
  const { id } = router.query;

  const emotionEntry = entries?.find((emotion) => emotion.id === id);

  if (!id) {
    return <p>Loading...</p>;
  }

  if (!emotionEntry) {
    return <p>No emotion entry found.</p>;
  }

  return <EmotionDetails entry={emotionEntry} onBack={() => router.back()} />;
}
