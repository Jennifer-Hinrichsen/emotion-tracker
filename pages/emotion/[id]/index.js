import EmotionDetails from "@/components/EmotionDetails";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function EmotionDetailPage({
  myBookmarkedEmotions,
  onToggleBookmark,
}) {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: selectedEmotion,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/emotionEntries/${id}`);

  if (isLoading || !router.isReady) {
    return <h1>Loading...</h1>;
  }

  if (error || !selectedEmotion) {
    return <h1>Error loading emotionEntries: {error.message}</h1>;
  }

  async function handleDelete() {
    const response = await fetch(`/api/emotionEntries/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <EmotionDetails
      emotion={selectedEmotion}
      onDeleteEmotion={handleDelete}
      myBookmarkedEmotions={myBookmarkedEmotions}
      onToggleBookmark={onToggleBookmark}
    />
  );
}
