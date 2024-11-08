import styled from "styled-components";
import EmotionCard from "./EmotionCard";
import { useState, useRef } from "react";
import { emotionList } from "@/lib/emotionList";

export default function EmotionList({
  emotions,
  onToggleBookmark,
  myBookmarkedEmotions,
}) {
  const [selectedFilter, setSelectedFilter] = useState("");
  const tabsBoxRef = useRef(null);

  const filteredEmotions = selectedFilter
    ? emotions.filter((emotion) => emotion.emotionType === selectedFilter)
    : emotions;

  const scrollTabs = (direction) => {
    if (tabsBoxRef.current) {
      const scrollAmount = direction === "left" ? -100 : 100;
      tabsBoxRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <StyledDivWrapper>
        <StyledHeadline>Filter emotion type</StyledHeadline>
        <StyledWrapper>
          <StyledIconLeft
            aria-label="Icon to slide the filter to the left"
            onClick={() => scrollTabs("left")}
          >
            &#9664;
          </StyledIconLeft>
          <StyledTabsBox ref={tabsBoxRef}>
            {emotionList.map((emotion) => (
              <StyledTab
                key={emotion.id}
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
              </StyledTab>
            ))}
          </StyledTabsBox>
          <StyledIconRight
            aria-label="Icon to slide the filter to the left"
            onClick={() => scrollTabs("right")}
          >
            &#9654;
          </StyledIconRight>
        </StyledWrapper>
      </StyledDivWrapper>

      {filteredEmotions.length === 0 ? (
        <StyledMessage>
          At the moment there are no emotions in the list. Please add an
          emotion.
        </StyledMessage>
      ) : (
        <ul>
          {filteredEmotions.map((emotion) => (
            <StyledCardList key={emotion.id}>
              <EmotionCard
                emotion={emotion}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={myBookmarkedEmotions.includes(emotion.id)}
              />
            </StyledCardList>
          ))}
        </ul>
      )}
    </>
  );
}

const StyledDivWrapper = styled.div`
  background-color: #f6f4f3;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

const StyledHeadline = styled.h2`
  margin: 10px 0 0 20px;
`;

const StyledWrapper = styled.div`
  padding: 0 20px;
  position: relative;
  max-width: 1000px;
  border-radius: 13px;
`;

const StyledIconLeft = styled.div`
  position: absolute;
  top: 0;
  left: -30px;
  height: 100%;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #f6f4f3 70%, transparent);
  cursor: pointer;
  user-select: none; /* Verhindert Markieren des Inhalts */
  -webkit-tap-highlight-color: transparent; /* Entfernt blaue Markierung auf mobilen Geräten */

  i {
    font-size: 1.5rem;
    color: #5372f0;
  }

  &:focus {
    outline: none; /* Entfernt den Fokusring */
  }
`;

const StyledTabsBox = styled.ul`
  display: flex;
  gap: 12px;
  list-style: none;
  overflow-x: auto; /* Allow scrolling */
  overflow-y: hidden;
  scrollbar-width: none; /* Firefox: Hide scrollbar */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on mobile */
  margin-right: 30px;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari: Hide scrollbar */
  }
`;

const StyledTab = styled.li`
  cursor: pointer;
  font-size: 1.18rem;
  white-space: nowrap;
  background: #f9f9f9;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #d8d5f2;
  transition: background-color 0.3s ease;
  -webkit-tap-highlight-color: transparent; /* Entfernt blaue Markierung auf mobilen Geräten */

  &:hover {
    border-color: black;
  }

  &:active {
    color: #fff;
    background: #5372f0;
    border-color: transparent;
  }

  ${({ $isSelected }) =>
    $isSelected &&
    `
    color: #fff;
    background: #5372f0;
    border-color: transparent;
  `}
`;

const StyledIconRight = styled.div`
  position: absolute;
  top: 0;
  right: -30px;
  height: 100%;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-90deg, #f6f4f3 70%, transparent);
  cursor: pointer;
  user-select: none; /* Verhindert Markieren des Inhalts */
  -webkit-tap-highlight-color: transparent; /* Entfernt blaue Markierung auf mobilen Geräten */

  i {
    font-size: 1.5rem;
    color: #5372f0;
  }

  &:focus {
    outline: none; /* Entfernt den Fokusring */
  }
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
