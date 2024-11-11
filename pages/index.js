import Heading from "@/components/Heading";
import EmotionForm from "@/components/EmotionForm";
import Image from "next/image";
import styled from "styled-components";
import List from "@/components/EmotionListAndFilter/List";
import Filter from "@/components/EmotionListAndFilter/Filter";
import { useState } from "react";

export default function HomePage({
  emotions,
  onCreateEmotion,
  onToggleBookmark,
  myBookmarkedEmotions,
}) {
  const [selectedFilterButton, setSelectedFilterButton] = useState("");

  return (
    <>
      <Heading>Mood Wave</Heading>
      <ImageWrapper>
        <Image
          src="/images/logo-final.svg"
          alt="Mood Wave"
          width={50}
          height={50}
        />
      </ImageWrapper>
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

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;
