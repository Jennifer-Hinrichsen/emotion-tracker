import styled from "styled-components";
import EmotionCard from "./EmotionCard";
import { useState, useRef, useEffect } from "react";
import { emotionList } from "@/lib/emotionList";

export default function EmotionList({
  emotions,
  onToggleBookmark,
  myBookmarkedEmotions,
}) {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false); // initialisiere mit false
  const tabsBoxRef = useRef(null);

  const filteredEmotions = selectedFilter
    ? emotions.filter((emotion) => emotion.emotionType === selectedFilter)
    : emotions;

  const updateArrowVisibility = () => {
    const tabsBox = tabsBoxRef.current;
    if (tabsBox) {
      const canScrollLeft = tabsBox.scrollLeft > 0;
      const canScrollRight =
        tabsBox.scrollWidth > tabsBox.clientWidth + tabsBox.scrollLeft;
      setShowLeftArrow(canScrollLeft);
      setShowRightArrow(canScrollRight);
    }
  };

  const handleScroll = () => {
    updateArrowVisibility();
  };

  const scrollTabs = (direction) => {
    if (tabsBoxRef.current) {
      const scrollAmount = direction === "left" ? -100 : 100;
      tabsBoxRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    updateArrowVisibility();
    if (tabsBoxRef.current) {
      // Scrollt beim Laden zur Mitte des StyledTabsBox
      tabsBoxRef.current.scrollLeft =
        (tabsBoxRef.current.scrollWidth - tabsBoxRef.current.clientWidth) / 2;
    }
  }, [emotions]);

  return (
    <>
      <StyledDivWrapper>
        <StyledHeadline>
          {selectedFilter ? (
            <div>
              Emotion Type Filter: <span>&quot;{selectedFilter}&quot;</span>
            </div>
          ) : (
            "Emotion Type Filter"
          )}
        </StyledHeadline>
        <StyledWrapper>
          {showLeftArrow && (
            <StyledIconLeft
              aria-label="Icon to slide the filter to the left"
              onClick={() => scrollTabs("left")}
            >
              &#9664;
            </StyledIconLeft>
          )}
          <StyledTabsBox ref={tabsBoxRef} onScroll={handleScroll}>
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
                $color={emotion.color}
              >
                {emotion.emotionType}
              </StyledTab>
            ))}
          </StyledTabsBox>
          {showRightArrow && (
            <StyledIconRight
              aria-label="Icon to slide the filter to the right"
              onClick={() => scrollTabs("right")}
            >
              &#9654;
            </StyledIconRight>
          )}
        </StyledWrapper>
      </StyledDivWrapper>

      {filteredEmotions.length === 0 ? (
        <StyledMessage>
          At the moment there are no emotions in the list. Please add an
          emotion.
        </StyledMessage>
      ) : (
        <StyledUl>
          {filteredEmotions.map((emotion) => (
            <StyledCardList key={emotion.id}>
              <EmotionCard
                emotion={emotion}
                onToggleBookmark={onToggleBookmark}
                isBookmarked={myBookmarkedEmotions.includes(emotion.id)}
              />
            </StyledCardList>
          ))}
        </StyledUl>
      )}
    </>
  );
}

const StyledDivWrapper = styled.div`
  background-color: #f6f4f3;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
`;

const StyledHeadline = styled.h2`
  margin: 0;
  padding-top: 10px;
  color: #313366;
  text-align: center;

  span {
    font-weight: bold;
  }
`;

const StyledWrapper = styled.div`
  padding: 0 20px;
  position: relative;
  max-width: 1000px;
`;

const StyledIconLeft = styled.div`
  position: absolute;
  top: 0;
  left: -30px;
  height: 100%;
  width: 120px;
  font-size: 1.5rem;
  color: #313366;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background: linear-gradient(90deg, #f6f4f3 40%, transparent);
  cursor: pointer;
  user-select: none; /* Verhindert Markieren des Inhalts */
  -webkit-tap-highlight-color: transparent; /* Entfernt blaue Markierung auf mobilen Geräten */
`;

const StyledTabsBox = styled.ul`
  display: flex;
  gap: 12px;
  list-style: none;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  margin-right: 30px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTab = styled.li`
  cursor: pointer;
  font-size: 1rem;
  white-space: nowrap;
  background: #f9f9f9;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e0e1f0;
  transition: background-color 0.3s ease;
  opacity: 70%;
  -webkit-tap-highlight-color: transparent; /* Entfernt blaue Markierung auf mobilen Geräten */

  &:active {
    border-color: #313366;
  }

  ${({ $isSelected, $color }) =>
    $isSelected &&
    `
    background: ${$color};
    border-color: #313366;
    opacity: 100%;
  `}
`;

const StyledIconRight = styled.div`
  position: absolute;
  top: 0;
  right: -30px;
  height: 100%;
  width: 120px;
  font-size: 1.5rem;
  color: #313366;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-90deg, #f6f4f3 40%, transparent);
  cursor: pointer;
  user-select: none; /* Verhindert Markieren des Inhalts */
  -webkit-tap-highlight-color: transparent; /* Entfernt blaue Markierung auf mobilen Geräten */
`;

const StyledMessage = styled.p`
  text-align: center;
  color: #777;
  font-size: 1.1rem;
  padding: 24px 16px;
`;

const StyledUl = styled.ul`
  padding: 0;
`;

const StyledCardList = styled.li`
  list-style-type: none;
`;
