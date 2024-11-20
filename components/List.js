import styled from "styled-components";
import EmotionCard from "./EmotionCard";

export default function EmotionList({
  emotions,
  onToggleBookmark,
  myBookmarkedEmotions,
  customEmotionTypes,
  searchTerm,
}) {
  return (
    <>
      {emotions.length === 0 ? (
        <StyledMessage>No entries found.</StyledMessage>
      ) : (
        <StyledList>
          {emotions.map((emotion) => (
            <StyledCardList key={emotion.id}>
              <EmotionCard
                emotion={emotion}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={myBookmarkedEmotions.includes(emotion.id)}
                customEmotionTypes={customEmotionTypes}
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
