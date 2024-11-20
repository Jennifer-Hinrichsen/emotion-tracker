
import { useState } from "react":
import EmotionForm from "@/components/EmotionForm";

import styled from "styled-components";
import SearchBar from "@/components/Searchbar/Searchbar";

import List from "@/components/List";
import Filter from "@/components/Filter";
import useLocalStorageState from "use-local-storage-state";

export default function HomePage({
  emotions,
  onCreateEmotion,
  onToggleBookmark,
  myBookmarkedEmotions,
}) {
  const [searchTerm, setSearchTerm] = useLocalStorageState("searchTerm", {
    defaultValue: "",
  });
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };
  const filteredEmotions = emotions.filter((emotion) => {
    const matchesFilter = selectedFilter
      ? emotion.emotionType === selectedFilter
      : true;

    const matchesSearchTerm = searchTerm
      ? emotion.notes.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesFilter && matchesSearchTerm;
  });

  return (
    <>
      <StyledHeading>Mood Wave</StyledHeading>
      <EmotionForm emotions={emotions} onSubmit={onCreateEmotion} />

      <Filter
        emotions={emotions}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <SearchBar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
      />
      <List
        emotions={filteredEmotions}
        onToggleBookmark={onToggleBookmark}
        myBookmarkedEmotions={myBookmarkedEmotions}
        searchTerm={searchTerm}
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
