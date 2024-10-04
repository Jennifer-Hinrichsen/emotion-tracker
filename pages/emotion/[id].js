import EmotionDetails from "@/components/EmotionDetails";
import { initialEntries } from "@/lib/entries";
import { useRouter } from "next/router";

export default function EmotionDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const emotionEntry = initialEntries.find((emotion) => emotion.id === id);

  if (!id) {
    return <p>Loading...</p>;
  }
  if (!emotionEntry) {
    return <p>No emotion entry found.</p>;
  }

  return <EmotionDetails emotion={emotionEntry} />;
}
