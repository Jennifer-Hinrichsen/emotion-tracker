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

  const {
    data: selectedEmotion,
    error,
    isLoading,
  } = useSWR(`/api/emotionEntries/${id}`);

  console.log(selectedEmotion);

  if (isLoading || !router.isReady) {
    return <h1>Loading...</h1>;
  }

  if (error || !selectedEmotion) {
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
