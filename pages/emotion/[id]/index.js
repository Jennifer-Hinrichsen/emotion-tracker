import EmotionDetails from "@/components/EmotionDetails";
import { useRouter } from "next/router";

export default function EmotionDetailPage({
  emotions,
  onDeleteEmotion,
  myBookmarkedEmotions,
  onToggleBookmark,
  customEmotionTypes,
}) {
  const router = useRouter();
  const { id } = router.query;

  const selectedEmotion = emotions?.find((emotion) => emotion.id === id);

  if (!id) {
    return <p>Loading...</p>;
  }

  if (!selectedEmotion) {
    return <p>No emotion found.</p>;
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
