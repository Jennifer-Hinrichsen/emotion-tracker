import { useState } from "react";
import EmotionForm from "@/components/EmotionForm";
import SearchBar from "@/components/Searchbar";
import List from "@/components/List";
import Filter from "@/components/Filter";
import useLocalStorageState from "use-local-storage-state";
import Heading from "@/components/Heading";
import useSWR from "swr";
import Footer from "@/components/Footer";
import Image from "next/image";
import styled from "styled-components";

export default function HomePage({
  onToggleBookmark,
  myBookmarkedEmotions,
  showToastMessage,
}) {
  const { data: emotions, isLoading, mutate } = useSWR("/api/emotionEntries");

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

  async function handleAddEmotion(newEmotion) {
    const response = await fetch("/api/emotionEntries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmotion),
    });

    if (response.ok) {
      mutate();
    }
  }

  if (isLoading) return null;

  async function handleDeleteEmotion(id) {
    try {
      const response = await fetch(`/api/emotionEntries/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Emotion ${id} successfully deleted.`);
        mutate();
      } else {
        console.error("Failed to delete emotion.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  }

  const filteredEmotions = emotions.filter((emotion) => {
    const matchesFilter = selectedFilter
      ? emotion.type._id === selectedFilter
      : true;

    const matchesSearchTerm = searchTerm
      ? emotion.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emotion.type.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesFilter && matchesSearchTerm;
  });

  return (
    <>
      <Heading>Mood Wave</Heading>
      <StyledImageWrapper>
        <Image
          src="/Welcome-Emojis.svg"
          alt="Welcome Emojis"
          width={250}
          height={125}
          priority={true}
        />
      </StyledImageWrapper>
      <EmotionForm
        emotions={emotions}
        onSubmit={handleAddEmotion}
        showToastMessage={showToastMessage}
      />

      <Filter
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
        onDeleteEmotion={handleDeleteEmotion}
      />

      <Footer />
    </>
  );
}

const StyledImageWrapper = styled.div`
  text-align: center;
`;
