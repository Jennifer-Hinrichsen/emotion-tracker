import EmotionDetails from "@/components/EmotionDetails";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function EmotionDetailPage({
  onDeleteEmotion,
  myBookmarkedEmotions,
  onToggleBookmark,
  customEmotionTypes,
}) {
  const router = useRouter();
  const { id } = router.query;

  const { data: emotions, error, isLoading } = useSWR("/api/emotionEntries");

  const selectedEmotion = emotions?.find((emotion) => emotion._id === id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error || !emotions) {
    return <h1>Error loading emotionEntries: {error.message}</h1>;
  }

  function handleDelete() {
    onDeleteEmotion(id);
    router.push("/");
  }

  return (
    <EmotionDetails
      emotion={selectedEmotion}
      onDeleteEmotion={handleDelete}
      myBookmarkedEmotions={myBookmarkedEmotions}
      onToggleBookmark={onToggleBookmark}
      customEmotionTypes={customEmotionTypes}
    />
  );
}
