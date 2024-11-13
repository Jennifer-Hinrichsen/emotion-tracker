import Heading from "@/components/Heading";
import EmotionForm from "@/components/EmotionForm";
import EmotionList from "@/components/EmotionList";
import Image from "next/image";
import styled from "styled-components";
import SliderIntensity from "@/components/SliderIntensity";
export default function HomePage({
  emotions,
  onCreateEmotion,
  onToggleBookmark,
  myBookmarkedEmotions,
}) {
  return (
    <>
      <StyledHeading>Mood Wave</StyledHeading>
      <EmotionForm emotions={emotions} onSubmit={onCreateEmotion} />
      <EmotionList
        emotions={emotions}
        onToggleBookmark={onToggleBookmark}
        myBookmarkedEmotions={myBookmarkedEmotions}
      />
    </>
  );
}

const StyledHeading = styled.h1`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: var(--color-secondary);
`;
