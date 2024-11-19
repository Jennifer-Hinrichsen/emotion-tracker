import { useState, useEffect } from "react";
import EmotionForm from "@/components/EmotionForm";
import EmotionList from "@/components/EmotionList";
import styled from "styled-components";
import SearchBar from "@/components/Searchbar/Searchbar";
export default function HomePage({
  emotions,
  onCreateEmotion,
  onToggleBookmark,
  myBookmarkedEmotions,
}) {
  const [filteredEmotions, setFilteredEmotions] = useState(emotions);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    const filtered = emotions.filter((emotion) =>
      emotion.notes.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredEmotions(filtered);
    setSearchTerm(term);
  };
  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      localStorage.setItem("searchTerm", searchTerm);
    }
  }, [searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
      />
      <StyledHeading>Mood Wave</StyledHeading>
      <EmotionForm emotions={filteredEmotions} onSubmit={onCreateEmotion} />
      <EmotionList
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
  color: #313366;
`;
