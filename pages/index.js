import { useState } from "react";
import Heading from "@/components/Heading";
import EmotionForm from "@/components/EmotionForm";
import EmotionList from "@/components/EmotionList";
import styled from "styled-components";
import SearchBar from "@/components/Searcbar/Searchbar";
export default function HomePage({
  emotions,
  onCreateEmotion,
  onToggleBookmark,
  myBookmarkedEmotions,
}) {
  const [filteredEmotions, setFilteredEmotions] = useState(emotions);
  const handleSearch = (term) => {
    const filtered = emotions.filter((emotion) =>
      emotion.notes.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredEmotions(filtered);
  };

  return (
    <>
      <StyledHeading>Mood Wave</StyledHeading>
      <SearchBar onSearch={handleSearch} />
      <EmotionForm emotions={filteredEmotions} onSubmit={onCreateEmotion} />
      <EmotionList
        emotions={filteredEmotions}
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
  color: #313366;
`;
