import styled from "styled-components";
import EmotionCard from "./EmotionCard";
import { useState } from "react";
import { emotionList } from "@/lib/emotionList";

export default function EmotionList({
  emotions,
  onToggleBookmark,
  myBookmarkedEmotions,
  searchTerm,
}) {
  const [selectedFilter, setSelectedFilter] = useState("");

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
      <StyledHeadline>Filter emotion type</StyledHeadline>
      <StyledList>
        {emotionList.map((emotion) => (
          <StyledFilterList key={emotion.id}>
            <StyledFilterButtons
              onClick={() =>
                setSelectedFilter(
                  emotion.emotionType === selectedFilter
                    ? ""
                    : emotion.emotionType
                )
              }
              $isSelected={emotion.emotionType === selectedFilter}
            >
              {emotion.emotionType}
            </StyledFilterButtons>
          </StyledFilterList>
        ))}
      </StyledList>
      {filteredEmotions.length === 0 ? (
        <StyledMessage>
          {searchTerm
            ? "No emotions found for the search term. Please try a different keyword."
            : "No emotions found for the selected filter. Please reset the filter or choose another option."}
        </StyledMessage>
      ) : (
        <StyledList>
          {filteredEmotions.map((emotion) => (
            <StyledCardList key={emotion.id}>
              <EmotionCard
                emotion={emotion}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={myBookmarkedEmotions.includes(emotion.id)}
                intensity={emotion.intensity}
                searchTerm={searchTerm}
              />
            </StyledCardList>
          ))}
        </StyledList>
      )}
    </>
  );
}

const StyledHeadline = styled.h2`
  text-align: center;
`;

const StyledList = styled.ul`
  margin-bottom: 48px;
  padding: 0 1rem;
`;

const StyledFilterList = styled.li`
  display: inline-flex;
  list-style-type: none;
`;

const StyledFilterButtons = styled.button`
  margin: 5px;
  border-radius: 15px;
  border-color: white;
  min-width: 100px;
  height: 40px;
  font-weight: ${({ $isSelected }) => ($isSelected ? "bold" : "normal")};
  text-decoration: ${({ $isSelected }) => ($isSelected ? "underline" : "none")};
  background-color: ${({ $isSelected }) => ($isSelected ? "#ddd" : "#f0f0f0")};
`;

const StyledMessage = styled.p`
  text-align: center;
  color: #777;
  font-size: 1.1rem;
  padding: 24px 16px;
`;

const StyledCardList = styled.li`
  list-style-type: none;
`;
