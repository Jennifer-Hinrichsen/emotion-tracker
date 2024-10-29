import EmotionCard from "@/components/EmotionCard";
import Heading from "@/components/Heading";

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
      <Heading>My Emotions</Heading>
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
