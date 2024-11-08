import styled from "styled-components";
import EmotionCard from "./EmotionCard";
import { useState } from "react";
import { emotionList } from "@/lib/emotionList";

export default function EmotionList({
  emotions,
  onToggleBookmark,
  myBookmarkedEmotions,
}) {
  const [selectedFilter, setSelectedFilter] = useState("");

  const filteredEmotions = selectedFilter
    ? emotions.filter((emotion) => emotion.emotionType === selectedFilter)
    : emotions;

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
          At the moment there are no emotions in the list. Please add an
          emotion.
        </StyledMessage>
      ) : (
        <StyledList>
          {filteredEmotions.map((emotion) => (
            <StyledCardList key={emotion.id}>
              <EmotionCard
                emotion={emotion}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={myBookmarkedEmotions.includes(emotion.id)}
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
