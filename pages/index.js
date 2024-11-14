import Heading from "@/components/Heading";
import EmotionForm from "@/components/EmotionForm";
import styled from "styled-components";
import List from "@/components/List";
import Filter from "@/components/Filter";
import { useState } from "react";
import Calendar from "@/components/Calendar";

export default function HomePage({
  emotions,
  onCreateEmotion,
  onToggleBookmark,
  myBookmarkedEmotions,
}) {
  const [selectedFilterButton, setSelectedFilterButton] = useState("");

  return (
    <>
      <StyledHeading>Mood Wave</StyledHeading>
      <EmotionForm emotions={emotions} onSubmit={onCreateEmotion} />
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
