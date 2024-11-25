import { useState } from "react";
import EmotionForm from "@/components/EmotionForm";
import SearchBar from "@/components/Searchbar/Searchbar";
import List from "@/components/List";
import Filter from "@/components/Filter";
import useLocalStorageState from "use-local-storage-state";
import Heading from "@/components/Heading";
import useSWR from "swr";

export default function HomePage({
  onCreateEmotion,
  onToggleBookmark,
  myBookmarkedEmotions,
  customEmotionTypes,
}) {
  const { data: emotions, error, isLoading } = useSWR("/api/emotionEntries");

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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error || !emotions) {
    return <h1>Error loading emotionEntries: {error.message}</h1>;
  }

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
      <Heading>Mood Wave</Heading>
      <EmotionForm
        onSubmit={onCreateEmotion}
        customEmotionTypes={customEmotionTypes}
      />
      <Filter
        emotions={emotions}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        customEmotionTypes={customEmotionTypes}
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
        customEmotionTypes={customEmotionTypes}
        searchTerm={searchTerm}
      />
    </>
  );
}
