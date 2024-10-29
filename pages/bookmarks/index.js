import EmotionCard from "@/components/EmotionCard";

export default function BookmarksPage({
  objects,
  myBookmarkedEmotions,
  onToggleBookmark,
}) {
  const bookmarkedObjects = objects.filter((object) =>
    myBookmarkedEmotions.includes(object.id)
  );

  return (
    <>
      <h1>My Emotions</h1>
      {bookmarkedObjects.length > 0 ? (
        bookmarkedObjects.map((object) => (
          <EmotionCard
            key={object.id}
            object={object}
            onToggleBookmark={onToggleBookmark}
            isBookmarked={true}
          />
        ))
      ) : (
        <p>You have no bookmarked emotions anymore.</p>
      )}
    </>
  );
}
