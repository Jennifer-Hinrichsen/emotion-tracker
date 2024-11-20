import Heading from "@/components/Heading";
import EmotionForm from "@/components/EmotionForm";
import List from "@/components/List";
import Filter from "@/components/Filter";
import { useState } from "react";

export default function HomePage({
  emotions,
  onCreateEmotion,
  onToggleBookmark,
  myBookmarkedEmotions,
  customEmotionTypes,
}) {
  const [selectedFilterButton, setSelectedFilterButton] = useState("");

  return (
    <>
      <Heading>Mood Wave</Heading>
      <EmotionForm
        onSubmit={onCreateEmotion}
        customEmotionTypes={customEmotionTypes}
      />
      <Filter
        emotions={emotions}
        selectedFilterButton={selectedFilterButton}
        setSelectedFilterButton={setSelectedFilterButton}
      />
      <List
        emotions={emotions}
        selectedFilterButton={selectedFilterButton}
        onToggleBookmark={onToggleBookmark}
        myBookmarkedEmotions={myBookmarkedEmotions}
        customEmotionTypes={customEmotionTypes}
      />
    </>
  );
}
