import Heading from "@/components/Heading";
import EmotionForm from "@/components/EmotionForm";
import EmotionList from "@/components/EmotionList";
import Image from "next/image";
import styled from "styled-components";

export default function HomePage({
  emotions,
  onCreateEmotion,
  onToggleBookmark,
  myBookmarkedEmotions,
}) {
  return (
    <>
      <Heading>Mood Wave</Heading>
      <EmotionForm emotions={emotions} onSubmit={onCreateEmotion} />
      <EmotionList
        emotions={emotions}
        onToggleBookmark={onToggleBookmark}
        myBookmarkedEmotions={myBookmarkedEmotions}
      />
    </>
  );
}
