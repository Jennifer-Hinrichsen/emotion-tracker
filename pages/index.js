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
  const { data: emotionTypes } = useSWR("/api/emotionTypes");

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

  if (error || !emotionTypes) {
    return <h1>Error loading emotionEntries: {error}</h1>;
  }
  console.log("emotions on HP:", emotions);
  const filteredEmotions = emotions.filter((emotion) => {
    const matchesFilter = selectedFilter
      ? emotion.type.name === selectedFilter
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
        customEmotionTypes={emotionTypes}
      />
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        customEmotionTypes={emotionTypes}
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
        customEmotionTypes={emotionTypes}
        searchTerm={searchTerm}
      />
    </>
  );
}
