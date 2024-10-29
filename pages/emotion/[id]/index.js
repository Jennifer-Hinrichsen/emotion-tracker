import EmotionDetails from "@/components/EmotionDetails";
import { useRouter } from "next/router";

export default function EmotionDetailPage({
  objects,
  onDeleteEmotion,
  myBookmarkedEmotions,
  onToggleBookmark,
}) {
  const router = useRouter();
  const { id } = router.query;

  const emotionObject = objects?.find((object) => object.id === id);

  if (!id) {
    return <p>Loading...</p>;
  }

  if (!emotionObject) {
    return <p>No emotion found.</p>;
  }
  function handleDelete() {
    onDeleteEmotion(id);
    router.push("/");
  }

  return (
    <EmotionDetails
      object={emotionObject}
      onDeleteEmotion={handleDelete}
      myBookmarkedEmotions={myBookmarkedEmotions}
      onToggleBookmark={onToggleBookmark}
    />
  );
}
